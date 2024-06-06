import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/services/auth.service';

export function adminGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const _cookieService = inject(CookieService);
    const authService = inject(AuthService);

    if (!_cookieService.get('access_token')) {
      router.navigate(['/home']);
    }

    return new Promise((resolve, reject) => {
      const router = inject(Router);
      const _cookieService = inject(CookieService);
      const authService = inject(AuthService);

      authService.isAdminRole().subscribe((res) => {
        if (res.data) {
          resolve(res.data);
        } else {
          resolve(router.navigate(['/home']));
        }
      });
    });
  };
}
