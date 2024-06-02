import { UserService } from './../../shared/services/UserServices/user.service';
import { CommonModule } from '@angular/common';
import { Component, type SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule, type ListboxChangeEvent } from 'primeng/listbox';
import { StepsModule } from 'primeng/steps';
import { HrComponent } from '../../shared/components/hr/hr.component';
import { AddressService } from '../../shared/services/AddressServices/address.service';
import type { IUserAddress } from '../../shared/interfaces/user';
import { BillingAddressComponent } from './components/billing-address/billing-address.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
import { RecheckBillComponent } from './components/recheck-bill/recheck-bill.component';
import { OrderService } from '../../shared/services/OrderServices/order.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ListboxModule,
    StepsModule,
    DropdownModule,
    HrComponent,
    BillingAddressComponent,
    CompleteOrderComponent,
    RecheckBillComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  public step: number = 1;
  public billingAddress!: IUserAddress;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  public onNextStep1(event: any) {
    if (event) {
      const { formValue, isSave } = event;

      this.billingAddress = formValue;

      if (isSave) {
        this.userService.saveNewAddress(formValue).subscribe((response) => {
          console.log(response);
        });
      }

      this.step += 1;
    }
  }

  public onNextStep2($event: any) {
    this.orderService.createNewOrder($event).subscribe((response) => {
      console.log(response);
    });
    return (this.step += 1);
  }

  public onComplete($event: any) {}
}
