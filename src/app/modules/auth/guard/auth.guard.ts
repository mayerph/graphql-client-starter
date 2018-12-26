import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const permissions = route.data.permissions
        const isAuthorized = this.authService.isAuthorized(permissions)
        if (!isAuthorized) {
            this.router.navigate(['/'])
        }
        return isAuthorized
    }
}
