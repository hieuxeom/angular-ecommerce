import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { IApiResponse } from '../../interfaces/api';
import { IVoucher } from '../../interfaces/voucher';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  private API_URL: string = 'http://localhost:5000/api/vouchers';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getVoucherData(voucherCode: string) {
    return this.httpClient.get<IApiResponse<IVoucher>>(
      `${this.API_URL}/${voucherCode}`,
      this._httpConfig.getHttpOptions()
    );
  }

  public getAllVouchers() {
    return this.httpClient.get<IApiResponse<IVoucher[]>>(
      this.API_URL,
      this._httpConfig.getHttpOptions()
    );
  }

  public editVoucher(voucherId: string, editVoucherForm: any) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/${voucherId}`,
      editVoucherForm,
      this._httpConfig.getHttpOptions()
    );
  }

  public createVoucher(createVoucherForm: any) {
    return this.httpClient.post<IApiResponse>(
      this.API_URL,
      createVoucherForm,
      this._httpConfig.getHttpOptions()
    );
  }
}
