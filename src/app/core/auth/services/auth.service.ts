import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { ILogin, INewAccount } from '../../../shared/interfaces/auth';
import { catchError, type Observable } from 'rxjs';
import type { IApiResponse } from '../../../shared/interfaces/api';
import type { IUserAuth } from '../../../shared/interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup } from '@angular/forms';
import { HttpConfigService } from '../../../shared/services/HttpConfig/http-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API_URL = 'http://localhost:5000/api/auth';
  public REFRESH_TOKEN_API_URL: string = 'http://localhost:5000/api/users/rftk';

  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService,
    private _httpConfig: HttpConfigService
  ) {}

  public isLoggedIn() {
    if (this._cookieService.get('access_token')) {
      return true;
    } else {
      if (this._cookieService.get('refresh_token')) {
        this._httpConfig.getNewAccessToken();
        return true;
      }
      return false;
    }
  }

  public createNewAccount(
    registerData: INewAccount
  ): Observable<IApiResponse<IUserAuth>> {
    return this.httpClient.post<IApiResponse<IUserAuth>>(
      `${this.API_URL}/signup`,
      registerData
    );
  }

  public verifyAccount(
    loginData: FormGroup
  ): Observable<IApiResponse<IUserAuth>> {
    return this.httpClient.post<IApiResponse<IUserAuth>>(
      `${this.API_URL}/signin`,
      loginData
    );
  }

  public isAdminRole() {
    return this.httpClient.get<IApiResponse>(
      `${this.API_URL}/admin`,
      this._httpConfig.getHttpOptions()
    );
  }
}
