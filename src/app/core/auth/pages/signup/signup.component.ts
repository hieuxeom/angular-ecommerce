import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import type { INewAccount } from '../../../../shared/interfaces/auth';
import { ToastService } from 'angular-toastify';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ToastModule,
    RippleModule,
  ],
  providers: [AuthService, MessageService, Router],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public userName: string = '';
  public email: string = '';
  public password: string = '';
  public rePassword: string = '';

  constructor(
    private authApiService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  handleSignUp() {
    if (
      this.password !== this.rePassword ||
      (!this.password && !this.rePassword)
    ) {
      return this._messageService.add({
        severity: 'error',
        summary: 'Two password not match',
        detail: 'Please check password and repassword',
      });
    }

    const registerData: INewAccount = {
      userName: this.userName,
      password: this.password,
      email: this.email,
    };

    this.authApiService.createNewAccount(registerData).subscribe((data) => {
      if (data.status === 'success') {
        this._messageService.add({
          severity: 'success',
          summary: 'Create new account successfully',
          detail:
            'You will be automatically redirected to the login page after 3 seconds',
        });

        setTimeout(() => {
          this._router.navigateByUrl('/auth/login');
        }, 3000);
      }
    });
  }
}
