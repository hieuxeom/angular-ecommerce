import { HttpConfigService } from './../HttpConfig/http-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import type { IApiResponse } from '../../interfaces/api';
import type { IProduct } from '../../interfaces/product';

// Define the ProductService
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public API_URL = 'http://localhost:5000/api/products';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  private objectToQueryString(params: any) {
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&');
    return queryString;
  }

  public getAllProducts(
    isFull: boolean = false
  ): Observable<IApiResponse<IProduct[]>> {
    return this.httpClient
      .get<IApiResponse<IProduct[]>>(`${this.API_URL}?isFull=${isFull}`)
      .pipe(retry(3), catchError(this._httpConfig.handleError));
  }

  public getProductsWithFilter(filters: any) {
    return this.httpClient.get<IApiResponse<IProduct[]>>(
      this.API_URL + '?' + this.objectToQueryString(filters)
    );
  }

  public getProductById(productId: string) {
    return this.httpClient.get<IApiResponse<IProduct>>(
      `${this.API_URL}/${productId}`
    );
  }

  public getAllProductColors() {
    return this.httpClient.get<IApiResponse<string[]>>(
      `${this.API_URL}/colors`
    );
  }

  public getNewArrivalProducts() {
    return this.httpClient.get<IApiResponse<IProduct[]>>(
      `${this.API_URL}/arrivals`
    );
  }

  public getTopSell() {
    return this.httpClient.get<IApiResponse<IProduct[]>>(
      `${this.API_URL}/top-sell`
    );
  }

  public increaseView(productId: string) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}/${productId}/views`,
      {}
    );
  }

  public changeActivateStatus(productId: string, isActive: boolean) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/${productId}/activate`,
      {
        isActive,
      },
      this._httpConfig.getHttpOptions()
    );
  }
}
