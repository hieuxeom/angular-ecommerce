import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {CartService} from '../../../../shared/services/CartServices/cart.service';
import {
  ICartItem,
  IUserAddress,
  IUserCart,
} from '../../../../shared/interfaces/user';
import {ReviewItemComponent} from '../review-item/review-item.component';

@Component({
  selector: 'app-recheck-bill',
  standalone: true,
  imports: [CommonModule, HrComponent, ReviewItemComponent],
  templateUrl: './recheck-bill.component.html',
  styleUrl: './recheck-bill.component.css',
})
export class RecheckBillComponent {
  @Output() onNext = new EventEmitter();
  @Input() billingAddress!: IUserAddress;
  public cartItems: ICartItem[] = [];

  public subTotalPrice: number = 0;
  public totalPrice: number = 0;
  public discountPrice: number = 0;
  public deliveryFee: number = 0;
  public showOrderReview: boolean = false;
  public voucherCode: string = '';

  constructor(private cartService: CartService) {
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data.cartItems;
        this.subTotalPrice = response.data.subTotalPrice;
        this.discountPrice = response.data.discountPrice;
        this.deliveryFee = response.data.deliveryFee;
        this.totalPrice = response.data.totalPrice;
        this.voucherCode = response.data.voucherCode;
      }
    });
  }

  handleShowOrderReview() {
    return (this.showOrderReview = !this.showOrderReview);
  }

  public handleOnNext() {
    return this.onNext.emit({
      orderItems: this.cartItems,
      subTotalPrice: this.subTotalPrice,
      totalPrice: this.totalPrice,
      discountPrice: this.discountPrice,
      deliveryFee: this.deliveryFee,
      voucherCode: this.voucherCode,
      customerInfo: {
        fullName: this.billingAddress.fullName,
        email: this.billingAddress.email,
        phoneNumber: this.billingAddress.phoneNumber,
        fullAddress: this.billingAddress.fullAddress,
      },
    });
  }
}
