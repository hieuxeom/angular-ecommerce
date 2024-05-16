import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export function profileGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const _cookieService = inject(CookieService);
    function isHaveAccessToken() {
      const isHaveAccessToken = _cookieService.get('access_token');
      return !!isHaveAccessToken;
    }

    if (!isHaveAccessToken()) {
      router.navigate(['/auth/login']); // Use navigate instead of createUrlTree
      return false; // Prevent further navigation
    }
    return true;
  };
}
