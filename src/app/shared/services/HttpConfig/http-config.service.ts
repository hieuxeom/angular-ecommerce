import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';
import { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  public REFRESH_TOKEN_API_URL: string = 'http://localhost:5000/api/users/rftk';

  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}

  public getNewAccessToken() {
    this.httpClient
      .get<IApiResponse>(this.REFRESH_TOKEN_API_URL, this.getRefreshOptions())
      .subscribe((response) => {
        const accessTokenExpiredTime = new Date();
        accessTokenExpiredTime.setHours(accessTokenExpiredTime.getHours() + 1);

        this._cookieService.set(
          'access_token',
          response.data,
          accessTokenExpiredTime,
          '/'
        );
      });
  }

  public getRefreshOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-rftk': this._cookieService.get('refresh_token'),
      },
    };
  }

  public getHttpOptions() {
    let returnHeader = {};

    if (this._cookieService.get('access_token')) {
      returnHeader = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._cookieService.get('access_token')}`,
        },
      };
    } else {
      this.getNewAccessToken();
      returnHeader = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._cookieService.get('access_token')}`,
        },
      };
    }
    return returnHeader;
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
