import {Component, SimpleChanges} from '@angular/core';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {CommonModule} from '@angular/common';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {AddressService} from '../../../../shared/services/AddressServices/address.service';
import {AddressBoxComponent} from '../../../../shared/components/address-box/address-box.component';
import {UserService} from '../../../../shared/services/UserServices/user.service';
import {IUserAddress} from '../../../../shared/interfaces/user';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {UserAddressService} from '../../../../shared/services/UserAddressServices/user-address.service';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HrComponent,
    FormsModule,
    ReactiveFormsModule,
    AddressBoxComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css',
})
export class EditAddressComponent {
  public addressForm: FormGroup;
  public addressData!: IUserAddress;
  public addressId: string | undefined;

  constructor(
    private userAddressService: UserAddressService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.addressForm = this._formBuilder.group({
      fullName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      fullAddress: new FormControl(''),
      isDefault: new FormControl(),
    });

    this._route.params.subscribe({
      next: (param) => {
        this.addressId = param['addressId'];
        if (this.addressId) {
          console.log(this.addressId);
          this.userAddressService
            .getUserAddressDetails(this.addressId)
            .subscribe({
              next: (response) => {
                this.addressData = response.data;
              }
            });
        }
      }
    });
  }

  public onSaveAddress($event: any) {
    const {formValue: newAddress} = $event;
    this.userAddressService
      .editAddress(this.addressId!, newAddress)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Edit address successfully ',
          });

          setTimeout(() => {
            this._router.navigate(['/profile', 'list-address']);
          }, 1000);
        }
      });
  }
}
