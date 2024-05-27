import { Component, EventEmitter, Output } from '@angular/core';
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
  public isNewAddress: boolean = true;

  public provinces: any[] = [];
  public selectedProvince: string = '';

  public districts: any[] = [];
  public selectedDistrict: string = '';

  public wards: any[] = [];
  public selectedWard: string = '';

  public streetAddress: string = '';

  public addressForm: FormGroup;
  constructor(
    private addressService: AddressService,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    this.getListProvinces();
    this.getListAddresses();

    this.addressForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      fullAddress: ['', Validators.required],
    });
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
        const { fullName, email, phoneNumber, fullAddress } =
          this.listAddresses[event.value];

        console.log(fullName, email, phoneNumber, fullAddress);
        this.addressForm.patchValue({
          fullName,
          email,
          phoneNumber,
          fullAddress,
        });
      } else {
        this.isNewAddress = true;
        this.addressForm.reset();
      }
    } catch (err) {
      console.log(err);
    }
  }

  public getListProvinces() {
    return this.addressService.getListProvinces().subscribe(({ results }) => {
      const reMapResults = results.map(({ province_id, province_name }) => {
        return {
          label: province_name,
          value: province_id,
        };
      });
      this.provinces = reMapResults;
      return this.onFillAddress();
    });
  }

  public getListDistricts() {
    this.addressService
      .getListDistricts(this.selectedProvince)
      .subscribe(({ results }) => {
        const reMapResults = results.map(({ district_id, district_name }) => {
          return {
            label: district_name,
            value: district_id,
          };
        });
        this.districts = reMapResults;
      });
    return this.onFillAddress();
  }

  public getListWards() {
    return this.addressService
      .getListWards(this.selectedDistrict)
      .subscribe(({ results }) => {
        const reMapResults = results.map(({ ward_id, ward_name }) => {
          return {
            label: ward_name,
            value: ward_id,
          };
        });
        this.wards = reMapResults;
      });
  }

  private getWardName(wardId: string) {
    if (!wardId) {
      return '_';
    }
    return this.wards.find((ward) => ward.value === wardId).label;
  }

  private getDistrictName(districtId: string) {
    if (!districtId) {
      return '_';
    }
    return this.districts.find((district) => district.value === districtId)
      .label;
  }

  private getProvinceName(provinceId: string) {
    if (!provinceId) {
      return '_';
    }

    return this.provinces.find((province) => province.value === provinceId)
      .label;
  }

  public onFillAddress() {
    return this.addressForm.patchValue({
      fullAddress: `${this.streetAddress}, ${this.getWardName(
        this.selectedWard
      )}, ${this.getDistrictName(
        this.selectedDistrict
      )}, ${this.getProvinceName(this.selectedProvince)}`,
    });
  }

  public checkValidAddress(): boolean {
    if (
      this.selectedProvince &&
      this.selectedDistrict &&
      this.selectedWard &&
      this.streetAddress
    ) {
      return true;
    }
    return false;
  }

  public onNextClick() {
    console.log('clicked');
    if (this.isNewAddress) {
      if (this.checkValidAddress() && this.addressForm.valid) {
        this.onNext.emit({ formValue: this.addressForm.value, isSave: true });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a delivery address',
        });
      }
    } else {
      this.onNext.emit({ formValue: this.addressForm.value, isSave: false });
    }
  }
}
