import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { AddressService } from '../../../../shared/services/AddressServices/address.service';
import { UserService } from '../../../../shared/services/UserServices/user.service';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AddressBoxComponent } from '../../../../shared/components/address-box/address-box.component';
import { IUserAddress } from '../../../../shared/interfaces/user';

interface IEmitData {
  formValue: any;
  isSave: boolean;
}

@Component({
  selector: 'app-billing-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    DropdownModule,
    HrComponent,
    ConfirmDialogModule,
    ToastModule,
    AddressBoxComponent,
  ],
  providers: [MessageService],
  templateUrl: './billing-address.component.html',
  styleUrl: './billing-address.component.css',
})
export class BillingAddressComponent {
  @Output() onNext = new EventEmitter<IEmitData>();

  public listAddressesOptions: any[] = [];
  public listAddresses: any[] = [];
  public selectedAddress: any;
  public addressData: IUserAddress | undefined;
  public isNewAddress: boolean = true;

  constructor(private userService: UserService) {
    this.getListAddresses();
  }
  public getListAddresses() {
    return this.userService.getListAddresses().subscribe(({ data }) => {
      this.listAddresses = data;
      this.listAddressesOptions = data.map(({ fullAddress }, index) => {
        return { label: fullAddress, value: index };
      });
      this.listAddressesOptions.push({ label: '* New', value: 'new' });
    });
  }

  public handleChangeAddress(event: ListboxChangeEvent) {
    try {
      if (event.value !== 'new') {
        this.isNewAddress = false;
        console.log(this.listAddresses[event.value]);
        this.addressData = this.listAddresses[event.value];
      } else {
        this.isNewAddress = true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  public handleNextStep($event: any) {
    // console.log({ ...$event, isSave: true });
    if (this.isNewAddress) {
      this.onNext.emit({ ...$event, isSave: true });
    } else {
      this.onNext.emit({ ...$event, isSave: false });
    }
  }
}
