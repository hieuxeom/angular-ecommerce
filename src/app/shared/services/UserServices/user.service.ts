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
  public API_URL = 'http://localhost:5000/api/users';
  constructor(
    private httpClient: HttpClient,
    private _cookieService: CookieService,
    private _httpConfig: HttpConfigService
  ) {}

  public getListAddresses() {
    return this.httpClient.get<IApiResponse<IUserAddress[]>>(
      `${this.API_URL}/me/address`,
      this._httpConfig.getHttpOptions()
    );
  }

  public saveNewAddress(newAddress: IUserAddress) {
    return this.httpClient.post(
      `${this.API_URL}/me/address`,
      newAddress,
      this._httpConfig.getHttpOptions()
    );
  }

  public getMe() {
    return this.httpClient.get<IApiResponse<IUser>>(
      `${this.API_URL}/me`,
      this._httpConfig.getHttpOptions()
    );
  }
}
