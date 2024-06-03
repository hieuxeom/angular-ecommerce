import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';

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
    return this.httpClient.post(
      this.API_URL_CHANGE_EMAIL,
      {
        email,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  // public sendEmailChangePassword(email: string) {
  //   return this.httpClient.post(
  //     this.API_URL_CHANGE_PWD,
  //     {
  //       email,
  //     },
  //     this._httpConfig.getHttpOptions()
  //   );
  // }
}
