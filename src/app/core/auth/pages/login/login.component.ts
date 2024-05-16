import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import type { ILogin } from '../../../../shared/interfaces/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastModule, RippleModule],
  providers: [AuthService, MessageService, Router, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(
    private authApiService: AuthService,
    private _messageService: MessageService,
    private _router: Router,
    private _cookieService: CookieService
  ) {}

  public handleLogin() {
    if (!this.email) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Email is required',
        detail: 'Please fill your email before logging in',
      });
    }

    if (!this.password) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Password is required',
        detail: 'Please fill your password  before logging in',
      });
    }

    const loginData: ILogin = {
      email: this.email,
      password: this.password,
    };

    this.authApiService.verifyAccount(loginData).subscribe(
      (response) => {
        if (response.status === 'success') {
          const expiredTime = new Date();
          expiredTime.setHours(expiredTime.getHours() + 1);

          this._cookieService.set(
            'access_token',
            response.data.accessToken,
            expiredTime,
            '/'
          );

          setTimeout(() => {
            this._router.navigate(['home']);
          }, 3000);
          return this._messageService.add({
            severity: 'success',
            summary: 'Login successful',
            detail:
              'You will be automatically redirected to the home page after 3 seconds',
          });
        }
      },
      ({ error }) => {
        return this._messageService.add({
          severity: 'error',
          summary: `${error.message}`,
          detail: 'Please check your login information again',
        });
      }
    );
  }
}
