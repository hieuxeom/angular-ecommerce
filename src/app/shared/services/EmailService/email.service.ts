import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { IApiResponse } from '../../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private API_URL_CHANGE_PWD =
    'http://localhost:5000/api/email/change-password';
  private API_URL_CHANGE_EMAIL = 'http://localhost:5000/api/email/change-email';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public sendEmailChangeEmailAddress(email: string) {
    return this.httpClient.post<IApiResponse>(
      this.API_URL_CHANGE_EMAIL,
      {
        email,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  public sendEmailChangePassword() {
    return this.httpClient.post<IApiResponse>(
      this.API_URL_CHANGE_PWD,
      {},
      this._httpConfig.getHttpOptions()
    );
  }
}
