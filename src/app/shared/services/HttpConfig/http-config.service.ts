import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  constructor(private _cookieService: CookieService) {}

  getHttpOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._cookieService.get('access_token')}`,
      },
    };
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(() =>
      console.log('Something bad happened; please try again later.')
    );
  }
}
