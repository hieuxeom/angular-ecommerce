import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import type { IApiResponse } from '../../interfaces/api';
import type { IUserAuth, IUserAddress, IUser } from '../../interfaces/user';
import { HttpConfigService } from '../HttpConfig/http-config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:5000/api/users';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getMe() {
    return this.httpClient.get<IApiResponse<IUser>>(
      `${this.API_URL}/me`,
      this._httpConfig.getHttpOptions()
    );
  }
}
