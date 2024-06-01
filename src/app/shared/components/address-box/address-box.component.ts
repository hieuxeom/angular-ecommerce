import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { HrComponent } from '../hr/hr.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddressService } from '../../services/AddressServices/address.service';
import { IUserAddress } from '../../interfaces/user';

interface IAddressBoxEmit {
  formValue: any;
}

@Component({
  selector: 'app-address-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    DropdownModule,
    HrComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './address-box.component.html',
  styleUrl: './address-box.component.css',
})
export class AddressBoxComponent {
  @Output() onSave = new EventEmitter<IAddressBoxEmit>();

  @Input() addressData: IUserAddress | undefined;
  @Input() isNewAddress: boolean = true;

  public provinces: any[] = [];
  public selectedProvince: string = '';

  public districts: any[] = [];
  public selectedDistrict: string = '';

  public wards: any[] = [];
  public selectedWard: string = '';

  public streetAddress: string = '';

  public addressForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private addressService: AddressService,

    private _messageService: MessageService
  ) {
    this.getListProvinces();
    this.addressForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      fullAddress: ['', Validators.required],
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('🚀 ~ AddressBoxComponent ~ ngOnChanges ~ changes:', changes);
    if (this.addressData) {
      const { fullName, email, phoneNumber, fullAddress } = this.addressData;
      this.addressForm.patchValue({
        fullName,
        email,
        phoneNumber,
        fullAddress,
      });
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

  public onSaveButton() {
    if (this.isNewAddress) {
      if (this.checkValidAddress() && this.addressForm.valid) {
        this.onSave.emit({ formValue: this.addressForm.value });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select a delivery address',
        });
      }
    } else {
      this.onSave.emit({ formValue: this.addressForm.value });
    }
  }
}
