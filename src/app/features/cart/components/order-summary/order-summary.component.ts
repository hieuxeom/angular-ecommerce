import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { CartService } from '../../../../shared/services/CartServices/cart.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HrComponent, ToastModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  @Input() voucherCode: string = '';
  @Input() subTotalPrice: number = 0;

  public isVoucher: boolean = true;
  public isHaveShipFee: boolean = false;
  public discountPrice: number = 0;
  public discountPercentage: number = 0;
  public deliveryFee: number = 0;
  public deliveryPercentage: number = 0;
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private _messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  public onCheckout() {
    console.log(this.subTotalPrice);
  }

  public onApplyVoucher() {
    this.cartService
      .setNewVoucherCode(this.voucherCode)
      .subscribe((response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }
}
