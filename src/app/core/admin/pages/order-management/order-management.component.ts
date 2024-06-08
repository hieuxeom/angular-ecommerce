import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { OrderService } from '../../../../shared/services/OrderServices/order.service';
import { IOrder, OrderStatusType } from '../../../../shared/interfaces/order';
import { formatDate } from '../../../../shared/utils/formatDate';
import { transformString } from '../../../../shared/utils/transformString';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrderStatusMap } from '../../../../shared/utils/orderStatus';

interface IOrderTable extends IOrder {
  transformId: string;
}

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css',
})
export class OrderManagementComponent {
  public listOrders: IOrderTable[] = [];

  public listOrderStatus: Record<string, string> = OrderStatusMap;

  public orderStatusForm: FormGroup;
  constructor(
    private orderService: OrderService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    this.getListOrders();

    this.orderStatusForm = this._formBuilder.group({
      orderStatus: ['pending'],
    });
  }

  private getListOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.listOrders = response.data.map((order) => {
        return {
          ...order,
          transformId: transformString(order._id),
          orderDate: formatDate(order.orderDate),
          createdAt: formatDate(order.createdAt),
          updatedAt: formatDate(order.updatedAt),
        };
      });
    });
  }

  public handleChangeStatus(orderId: string) {
    console.log(this.orderStatusForm.value);

    this.orderService
      .changeOrderStatus(orderId, this.orderStatusForm.value)
      .subscribe((response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      });
  }
}
