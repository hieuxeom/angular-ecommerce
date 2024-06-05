import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import type { ILogin } from '../../../../shared/interfaces/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    RippleModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private _messageService: MessageService,
    private _router: Router,
    private _cookieService: CookieService,
    private _formBuilder: FormBuilder
  ) {
    if (this.authService.isLoggedIn()) {
      console.log('direct in component');
      this._router.navigate(['/profile']);
    }

    this.authForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public handleLogin() {
    if (!this.authForm.valid) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Missing email or password field',
      });
    }

    this.authService.verifyAccount(this.authForm.value).subscribe(
      (response) => {
        if (response.status === 'success') {
          const accessTokenExpiredTime = new Date();
          accessTokenExpiredTime.setHours(
            accessTokenExpiredTime.getHours() + 1
          );

          const refreshTokenExpiredTime = new Date();
          refreshTokenExpiredTime.setDate(
            refreshTokenExpiredTime.getDate() + 1
          );

          this._cookieService.set(
            'access_token',
            response.data.accessToken,
            accessTokenExpiredTime,
            '/'
          );

          this._cookieService.set(
            'refresh_token',
            response.data.refreshToken,
            refreshTokenExpiredTime,
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
          summary: `Error`,
          detail: `${error.message}`,
        });
      }
    );
  }
}
