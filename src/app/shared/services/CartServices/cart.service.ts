import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { ICartItem, IUserCart } from '../../interfaces/user';
import type { IApiResponse } from '../../interfaces/api';
import { catchError, retry } from 'rxjs';
import { HttpConfigService } from '../HttpConfig/http-config.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public API_URL: string = 'http://localhost:5000/api/carts';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getUserCart() {
    return this.httpClient
      .get<IApiResponse<IUserCart>>(
        this.API_URL,
        this._httpConfig.getHttpOptions()
      )
      .pipe(retry(3), catchError(this._httpConfig.handleError));
  }

  public addProductToCart(postData: ICartItem) {
    return this.httpClient.post<IApiResponse>(
      this.API_URL,
      postData,
      this._httpConfig.getHttpOptions()
    );
  }

  public updateNewQuantity(putData: {
    productId: string;
    productVariant: string;
    newQuantity: number;
  }) {
    return this.httpClient.put(
      this.API_URL,
      putData,
      this._httpConfig.getHttpOptions()
    );
  }

  public deleteCartItem(deleteData: {
    productId: string;
    productVariant: string;
  }) {
    return this.httpClient.put(
      `${this.API_URL}/delete`,
      deleteData,
      this._httpConfig.getHttpOptions()
    );
  }

  public setNewVoucherCode(voucherCode: string) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/voucher`,
      {
        voucherCode,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  public setNewCartDetails(newData: {
    totalPrice: number;
    discountPrice: number;
    deliveryFee: number;
    subTotalPrice: number;
  }) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/update`,
      newData,
      this._httpConfig.getHttpOptions()
    );
  }
}
