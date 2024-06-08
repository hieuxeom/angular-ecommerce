import { Component, Input } from '@angular/core';
import { HrComponent } from '../../../../../../shared/components/hr/hr.component';
import { CommonModule } from '@angular/common';
import { OrderItemsComponent } from '../order-items/order-items.component';
import {
  IListOrderStatus,
  IOrder,
} from '../../../../../../shared/interfaces/order';
import { listOrderStatus } from '../../../../../../shared/utils/orderStatus';
import { formatFullDate } from '../../../../../../shared/utils/formatDate';
import { OrderService } from '../../../../../../shared/services/OrderServices/order.service';

@Component({
  selector: 'app-order-block',
  standalone: true,
  imports: [CommonModule, HrComponent, OrderItemsComponent],
  templateUrl: './order-block.component.html',
  styleUrl: './order-block.component.css',
})
export class OrderBlockComponent {
  @Input() orderData: IOrder | null = null;

  private listOrderStatus = listOrderStatus;
  public orderStatus: IListOrderStatus | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderStatus = this.listOrderStatus.find(
      (status) => status.value === this.orderData?.orderStatus
    )!;
  }

  public onCancelOrder() {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService
        .changeOrderStatus(this.orderData!._id, {
          orderStatus: 'cancelled',
        })
        .subscribe();

      this.orderStatus = this.listOrderStatus.find(
        (status) => status.value === 'cancelled'
      )!;
    }
  }
}
