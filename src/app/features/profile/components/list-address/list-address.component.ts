import { Component } from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { AddressBlockComponent } from '../address-block/address-block.component';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../../../shared/services/AddressServices/address.service';
import { IUserAddress } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../shared/services/UserServices/user.service';

@Component({
  selector: 'app-list-address',
  standalone: true,
  imports: [CommonModule, HrComponent, AddressBlockComponent],
  templateUrl: './list-address.component.html',
  styleUrl: './list-address.component.css',
})
export class ListAddressComponent {
  public listAddresses: IUserAddress[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getListAddress();
  }

  private getListAddress() {
    this.userService.getListAddresses().subscribe((response) => {
      this.listAddresses = response.data;
      console.log(this.listAddresses);
    });
  }
}
