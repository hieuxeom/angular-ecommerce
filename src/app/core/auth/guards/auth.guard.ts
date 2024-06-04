import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const _cookieService = inject(CookieService);
    const authService = inject(AuthService);

    if (_cookieService.get('refresh_token')) {
      router.navigate(['/profile']);
      return false;
    }
    return true;
  };
}
