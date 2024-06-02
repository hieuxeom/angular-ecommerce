import { Component } from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { AddressBlockComponent } from '../address-block/address-block.component';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../../shared/services/AddressServices/address.service';
import { IUserAddress } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../shared/services/UserServices/user.service';
import { UserAddressService } from '../../../../shared/services/UserAddressServices/user-address.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-address',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HrComponent,
    AddressBlockComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './list-address.component.html',
  styleUrl: './list-address.component.css',
})
export class ListAddressComponent {
  public listAddresses: IUserAddress[] = [];

  constructor(
    private userAddressService: UserAddressService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this.getListAddress();
  }

  private getListAddress() {
    this.userAddressService.getListAddresses().subscribe((response) => {
      this.listAddresses = response.data;
    });
  }

  public onDeleteAddress($event: any) {
    const addressId = $event;

    this.userAddressService.removeAddress(addressId).subscribe((response) => {
      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Address removed successfully',
      });
    });
  }
}
