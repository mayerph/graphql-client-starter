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
        const permissions = route.data.permissions
        const user = this.authService.decodeToken()
        const userPermissions = user ? user.role.permissions : []
        return this.authService.isAuthorized(permissions, userPermissions)
    }
}