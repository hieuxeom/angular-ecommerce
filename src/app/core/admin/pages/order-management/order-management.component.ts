import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { OrderService } from '../../../../shared/services/OrderServices/order.service';
import {
  IListOrderStatus,
  IOrder,
  OrderStatusType,
} from '../../../../shared/interfaces/order';
import { formatDate } from '../../../../shared/utils/formatDate';
import { transformString } from '../../../../shared/utils/transformString';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  OrderStatusClassMap,
  listOrderStatus,
} from '../../../../shared/utils/orderStatus';

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

  public classMap: Record<string, string> = OrderStatusClassMap;
  public listOrderStatus: IListOrderStatus[] = listOrderStatus;

  public activeFilter: string = 'all';

  public orderStatusForm: FormGroup;
  constructor(
    private orderService: OrderService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.getListOrders();

    this.orderStatusForm = this._formBuilder.group({
      orderStatus: ['pending'],
    });

    this._route.queryParamMap.subscribe({
      next: (params) => {
        this.activeFilter = params.get('status') || 'all';
        if (this.activeFilter !== 'all') {
          // fix
          this.orderService
            .getOrdersByFilter(this.activeFilter as OrderStatusType)
            .subscribe({
              next: (response) => {
                this.listOrders = response.data.map((order) => {
                  return {
                    ...order,
                    transformId: transformString(order._id),
                    orderDate: formatDate(order.orderDate),
                    createdAt: formatDate(order.createdAt),
                    updatedAt: formatDate(order.updatedAt),
                  };
                });
              },
            });
        } else {
          this.getListOrders();
        }
      },
    });
  }

  private getListOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.listOrders = response.data.map((order) => {
          return {
            ...order,
            transformId: transformString(order._id),
            orderDate: formatDate(order.orderDate),
            createdAt: formatDate(order.createdAt),
            updatedAt: formatDate(order.updatedAt),
          };
        });
      },
    });
  }

  public handleChangeStatus(
    fromStatus: OrderStatusType,
    toStatus: OrderStatusType
  ) {
    this.orderService
      .updateAllOrdersStatus({ fromStatus, toStatus })
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this._router.navigate(['/admin', 'orders'], {
            queryParams: {
              status: toStatus,
            },
          });
        },
      });
  }
}
