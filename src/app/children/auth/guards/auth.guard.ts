import { inject, Injectable } from '@angular/core';
import {
    CanActivateFn,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../data/services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ):
//         | Observable<boolean | UrlTree>
//         | Promise<boolean | UrlTree>
//         | boolean
//         | UrlTree {
//         return !!localStorage.getItem('token');
//     }
// }

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isAuthenticated()) {
        router.navigate(['/login']);
        return authService.isAuthenticated();
    }
    return authService.isAuthenticated();
};
