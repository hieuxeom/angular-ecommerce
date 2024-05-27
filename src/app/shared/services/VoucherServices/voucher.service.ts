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
  public API_URL: string = 'http://localhost:5000/api/vouchers';

  constructor(
    private httpClient: HttpClient,
    private httpConfig: HttpConfigService
  ) {}

  public getVoucherData(voucherCode: string) {
    return this.httpClient.get<IApiResponse<IVoucher>>(
      `${this.API_URL}/${voucherCode}`,
      this.httpConfig.getHttpOptions()
    );
  }
}
