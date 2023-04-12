import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router,
} from '@angular/router';
import { AuthService } from '../data/services/auth.service';


export const authGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/auth/login']);
    }

    return authService.isAuthenticated();
};
