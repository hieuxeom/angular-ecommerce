import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../../shared/services/OrderServices/order.service';
import { IListOrderStatus, IOrder, OrderStatusType } from '../../../../shared/interfaces/order';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { listOrderStatus } from '../../../../shared/utils/orderStatus';


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    OrderItemComponent,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  public orderId: string | null = null;

  public listOrderStatus = listOrderStatus;

  public selectedOrderStatus: IListOrderStatus = {
    label: '',
    value: '',
    class: '',
  };

  public orderStatusForm: FormGroup;

  public orderDetails: IOrder | undefined;
  constructor(
    private _route: ActivatedRoute,
    private orderService: OrderService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {
    this._route.paramMap.subscribe((params) => {
      this.orderId = params.get('orderId');
      if (this.orderId) {
        this.getOrderDetails(this.orderId);
      }
    });

    this.orderStatusForm = this._formBuilder.group({
      orderStatus: ['pending'],
    });

    this.orderStatusForm.get('orderStatus')?.valueChanges.subscribe((value) => {
      this.selectedOrderStatus = this.listOrderStatus.find(
        (status) => status.value === value
      )!;
    });
  }

  private getOrderDetails(orderId: string) {
    this.orderService.getOrderDetails(orderId).subscribe((response) => {
      this.orderDetails = response.data;
      this.orderStatusForm.patchValue({
        orderStatus: this.orderDetails?.orderStatus,
      });
    });
  }

  public handleChangeStatus() {
    console.log(this.orderStatusForm.value);
    if (this.orderId) {
      this.orderService
        .changeOrderStatus(this.orderId, this.orderStatusForm.value)
        .subscribe((response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.getOrderDetails(this.orderId!);
        });
    }
  }
}
