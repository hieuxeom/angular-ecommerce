import {Component, ElementRef, ViewChild} from '@angular/core';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {EmailService} from '../../../../shared/services/EmailService/email.service';
import {UserService} from '../../../../shared/services/UserServices/user.service';
import {IUser} from '../../../../shared/interfaces/user';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HrComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent {
  @ViewChild('getOTPButton') getOTPButton!: ElementRef;

  public userData!: IUser;

  public isChangeEmailMode: boolean = false;
  public isChangeUsernameMode: boolean = false;
  public changeEmailForm: FormGroup;
  public changeUsernameForm: FormGroup;

  constructor(
    private emailService: EmailService,
    private userService: UserService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.getUserData();
    this.changeEmailForm = this._formBuilder.group({
      newEmail: ['', [Validators.required, Validators.email]],
      otpCode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.changeUsernameForm = this._formBuilder.group({
      newUsername: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  private getUserData() {
    this.userService.getMe().subscribe({
      next: (response) => {
        this.userData = response.data;
      }
    });
  }

  public onClickChangeEmail() {
    return (this.isChangeEmailMode = !this.isChangeEmailMode);
  }

  private disableGetOTPButton() {
    this.getOTPButton.nativeElement.disabled = true;
    this.getOTPButton.nativeElement.innerHTML = 'Sent';
    setTimeout(() => {
      this.getOTPButton.nativeElement.disabled = false;
      this.getOTPButton.nativeElement.innerHTML = 'Get OTP';
    }, 1500);
  }

  public sendOTPChangeMail() {
    if (this.changeEmailForm.get(['newEmail'])!.valid) {
      this.emailService
        .sendEmailChangeEmailAddress(
          this.changeEmailForm.get(['newEmail'])!.value
        )
        .subscribe({
          next: (response) => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Email sent successfully',
            });
          }
        });
      this.disableGetOTPButton();
    } else {
      if (this.changeEmailForm.get(['newEmail'])?.hasError('required')) {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email is required',
        });
      } else if (this.changeEmailForm.get(['newEmail'])?.hasError('email')) {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please provide a valid email',
        });
      }
      console.log('vcl haha');
    }
  }

  public onSaveButton() {
    this.userService
      .changeEmailAddress(this.changeEmailForm.value)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Email address changed successfully',
            });

            this.isChangeEmailMode = false;
            this.changeEmailForm.reset();
            this.getUserData();
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.message,
            });
          }
        }
      });
  }

  public onClickChangeUsername() {
    return (this.isChangeUsernameMode = !this.isChangeUsernameMode);
  }

  public onChangeUserName() {
    this.userService
      .changeUsername(this.changeUsernameForm.value)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.isChangeUsernameMode = false;
            this.getUserData();
            this.changeUsernameForm.reset();
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'error',
              detail: response.message,
            });
          }
        }
      });
  }
}
