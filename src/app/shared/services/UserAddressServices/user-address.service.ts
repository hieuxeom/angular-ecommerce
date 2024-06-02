import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { IUserAddress } from '../../interfaces/user';
import { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  private API_URL = 'http://localhost:5000/api/users/me/address';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getListAddresses() {
    return this.httpClient.get<IApiResponse<IUserAddress[]>>(
      `${this.API_URL}`,
      this._httpConfig.getHttpOptions()
    );
  }

  public getUserAddressDetails(addressId: string) {
    return this.httpClient.get<IApiResponse<IUserAddress>>(
      `${this.API_URL}/${addressId}`,
      this._httpConfig.getHttpOptions()
    );
  }

  public saveNewAddress(newAddress: IUserAddress) {
    return this.httpClient.post(
      `${this.API_URL}`,
      newAddress,
      this._httpConfig.getHttpOptions()
    );
  }

  public editAddress(addressId: string, newAddress: IUserAddress) {
    console.log(newAddress);
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/${addressId}`,
      { newAddress: newAddress },
      this._httpConfig.getHttpOptions()
    );
  }
}
