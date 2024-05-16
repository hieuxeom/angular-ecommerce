import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { ILogin, INewAccount } from '../../../shared/interfaces/auth';
import { catchError, type Observable } from 'rxjs';
import type { IApiResponse } from '../../../shared/interfaces/api';
import type { IUser } from '../../../shared/interfaces/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API_URL = 'http://localhost:5000/api/auth';
  public httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this._cookieService.get('access_token')}`,
    },
  };
  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}

  public createNewAccount(
    registerData: INewAccount
  ): Observable<IApiResponse<IUser>> {
    return this.httpClient.post<IApiResponse<IUser>>(
      `${this.API_URL}/signup`,
      registerData
    );
  }

  public verifyAccount(loginData: ILogin): Observable<IApiResponse<IUser>> {
    return this.httpClient.post<IApiResponse<IUser>>(
      `${this.API_URL}/signin`,
      loginData
    );
  }

  // public getRefreshToken() {
  //   return this.httpClient.get(`${this.API_URL}`, this.httpOptions);
  // }
}
