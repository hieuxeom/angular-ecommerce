import {RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Component, Input, SimpleChanges} from '@angular/core';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {CartService} from '../../../../shared/services/CartServices/cart.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {VoucherService} from '../../../../shared/services/VoucherServices/voucher.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HrComponent,
    ToastModule,
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  @Input() voucherCode: string = '';
  @Input() subTotalPrice: number = 0;

  public isDiscount: boolean = false;
  public isHaveShipFee: boolean = true;
  public discountPrice: number = 0;
  public discountPercentage: number = 0;
  public deliveryFeeDefault: number = 15;
  public deliveryFee: number = 0;
  public deliveryPercentage: number = 0;
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private voucherService: VoucherService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.onChangeVoucherCode();
  }

  private onChangeVoucherCode() {
    if (this.voucherCode) {
      this.voucherService.getVoucherData(this.voucherCode).subscribe(
        (response) => {
          this.resetValue();
          if (response.data.minimumOrderValue > this.subTotalPrice) {
            this.voucherCode = '';
            this.cartService.setNewVoucherCode('').subscribe({
              next: (response) => {
                this._messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'The current voucher has been automatically deleted because the minimum order value does not meet the voucher requirements',
                });
              }
            });
          } else {
            if (response.data.type === 'bill') {
              this.discountPercentage = response.data.discount;
              this.discountPrice = this.calculateNewDiscountPrice();
              this.isDiscount = true;
              this.isHaveShipFee = true;
            } else {
              this.deliveryPercentage = response.data.discount;
              this.deliveryFee = this.calculateNewDeliveryPrice();
              this.isDiscount = false;
              this.isHaveShipFee = false;
            }
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.setNewCartDetails();
        }
      );
    } else {
      this.setNewCartDetails();
    }
  }

  private setNewCartDetails() {
    this.totalPrice = this.calculateNewTotal();
    this.cartService
      .setNewCartDetails({
        totalPrice: this.totalPrice,
        discountPrice: this.discountPrice,
        deliveryFee: this.isHaveShipFee
          ? this.deliveryFeeDefault
          : this.deliveryFeeDefault - this.deliveryFee,
        subTotalPrice: this.subTotalPrice,
      })
      .subscribe();
  }

  private resetValue() {
    this.discountPrice = 0;
    this.discountPercentage = 0;
    this.deliveryFee = 0;
    this.deliveryPercentage = 0;
  }

  private calculateNewDiscountPrice() {
    return Math.floor(
      this.subTotalPrice -
      this.subTotalPrice * ((100 - this.discountPercentage) / 100)
    );
  }

  private calculateNewDeliveryPrice() {
    return Math.floor(
      this.deliveryFeeDefault -
      this.deliveryFeeDefault * ((100 - this.deliveryPercentage) / 100)
    );
  }

  private calculateNewTotal() {
    return (
      this.subTotalPrice +
      (this.isHaveShipFee
        ? this.deliveryFeeDefault
        : this.deliveryFeeDefault - this.deliveryFee) -
      this.discountPrice
    );
  }

  public onCheckout() {
    console.log(this.subTotalPrice);
  }

  public onApplyVoucher() {
    this.cartService.setNewVoucherCode(this.voucherCode).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.onChangeVoucherCode();
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        }
      },

      ({error}) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
    );
  }
}
