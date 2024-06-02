import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public API_URL: string = 'http://localhost:5000/api/orders';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public createNewOrder(postData: any) {
    return this.httpClient.post<IApiResponse>(
      this.API_URL,
      postData,
      this._httpConfig.getHttpOptions()
    );
  }
}
