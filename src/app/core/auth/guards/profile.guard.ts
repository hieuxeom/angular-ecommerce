import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export function profileGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    const _cookieService = inject(CookieService);

    if (!_cookieService.get('refresh_token')) {
      router.navigate(['/auth/login']); // Use navigate instead of createUrlTree
      return false; // Prevent further navigation
    }
    return true;
  };
}
