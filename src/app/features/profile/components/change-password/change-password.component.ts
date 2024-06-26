import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../../../../shared/services/EmailService/email.service';
import { UserService } from '../../../../shared/services/UserServices/user.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    HrComponent,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  public changePwdForm: FormGroup;
  constructor(
    private emailService: EmailService,
    private userService: UserService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {
    this.changePwdForm = this._formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      otpCode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  public checkValidPassword() {
    if (this.changePwdForm.valid) {
      return (
        this.changePwdForm.get(['newPassword'])!.value ===
        this.changePwdForm.get(['confirmPassword'])!.value
      );
    }
    return false;
  }

  public handleSendEmail() {
    return this.emailService.sendEmailChangePassword().subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      },
      error: ({ error }) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
    });
  }

  public onClickChangeButton() {
    this.userService.changePassword(this.changePwdForm.value).subscribe(
      (response) => {
        if (response.status === 'success') {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
          });
        }
      },
      ({ error }) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
    );
  }
}
