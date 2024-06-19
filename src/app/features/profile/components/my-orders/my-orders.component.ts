import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {ProductService} from '../../../../shared/services/ProductServices/product.service';
import {IOrder} from '../../../../shared/interfaces/order';
import {OrderService} from '../../../../shared/services/OrderServices/order.service';
import {UserService} from '../../../../shared/services/UserServices/user.service';
import {OrderItemsComponent} from './components/order-items/order-items.component';
import {OrderBlockComponent} from './components/order-block/order-block.component';
import {formatFullDate} from '../../../../shared/utils/formatDate';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    HrComponent,
    OrderBlockComponent,
  ],
  providers: [MessageService],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  public listOrders: IOrder[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {
    this.getUserOrders();
  }

  private getUserOrders() {
    this.userService.getUserOrders().subscribe({
      next: (response) => {
        this.listOrders = response.data.map((order) => {
          return {
            ...order,
            orderDate: formatFullDate(order.orderDate),
          };
        });
        
      }
    });
  }
}
