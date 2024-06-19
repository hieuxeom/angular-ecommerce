import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {UserAddressService} from '../../../../shared/services/UserAddressServices/user-address.service';
import {AddressBoxComponent} from '../../../../shared/components/address-box/address-box.component';

@Component({
  selector: 'app-create-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HrComponent,
    ToastModule,
    AddressBoxComponent,
  ],
  providers: [MessageService],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.css',
})
export class CreateAddressComponent {
  constructor(
    private userAddressService: UserAddressService,
    private _messageService: MessageService,
    private _router: Router
  ) {
  }

  public onCreateAddress($event: any) {
    const {formValue: fullAddress} = $event;

    this.userAddressService
      .createNewAddress(fullAddress)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Created new address successfully',
          });

          setTimeout(() => {
            this._router.navigate(['/profile', 'list-address']);
          }, 1000);
        }
      });
  }
}
