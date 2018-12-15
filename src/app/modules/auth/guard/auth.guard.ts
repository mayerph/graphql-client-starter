import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const expectedRole = route.data.expectedRole
        const user = this.authService.decodeToken()
        if (!this.authService.isAuthenticated() || user.role.name !== expectedRole) {
            this.router.navigate(['/signin']);
            return false;
        } else {
            return true
        }
    }
}