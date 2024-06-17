import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { IApiResponse } from '../../interfaces/api';
import { IOrder, IOrderItem, OrderStatusType } from '../../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL: string = 'http://localhost:5000/api/orders';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public createNewOrder(postData: any) {
    return this.httpClient.post<IApiResponse>(
      this.API_URL,
      postData,
      this._httpConfig.getHttpOptions()
    );
  }

  public getAllOrders() {
    return this.httpClient.get<IApiResponse<IOrder[]>>(
      this.API_URL,
      this._httpConfig.getHttpOptions()
    );
  }

  public getOrdersByFilter(orderStatus: OrderStatusType) {
    return this.httpClient.get<IApiResponse<IOrder[]>>(
      `${this.API_URL}?filter=${orderStatus}`,
      this._httpConfig.getHttpOptions()
    );
  }

  public getOrderDetails(orderId: string) {
    return this.httpClient.get<IApiResponse<IOrder>>(
      `${this.API_URL}/${orderId}`,
      this._httpConfig.getHttpOptions()
    );
  }

  public changeOrderStatus(orderId: string, orderStatusForm: any) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/${orderId}`,
      orderStatusForm,
      this._httpConfig.getHttpOptions()
    );
  }
}
