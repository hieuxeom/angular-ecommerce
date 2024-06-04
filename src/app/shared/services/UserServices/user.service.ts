import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import type { IApiResponse } from '../../interfaces/api';
import type { IUserAuth, IUserAddress, IUser } from '../../interfaces/user';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { catchError, throwError } from 'rxjs';

interface changeEmailForm {
  newEmail: string;
  otpCode: string;
}

interface changePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

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

  public changeEmailAddress(changeEmailData: changeEmailForm) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}/email-address`,
      changeEmailData,
      this._httpConfig.getHttpOptions()
    );
  }

  public changeUsername(changeUsernameData: { newUserName: string }) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}/username`,
      changeUsernameData,
      this._httpConfig.getHttpOptions()
    );
  }

  public changePassword(newPasswordData: changePasswordForm) {
    return this.httpClient
      .post<IApiResponse>(
        `${this.API_URL}/change-password`,
        newPasswordData,
        this._httpConfig.getHttpOptions()
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
