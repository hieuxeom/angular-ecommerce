import { HttpConfigService } from './../HttpConfig/http-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
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

  public getAllProducts(): Observable<IApiResponse<IProduct[]>> {
    return this.httpClient
      .get<IApiResponse<IProduct[]>>(this.API_URL)
      .pipe(retry(3), catchError(this._httpConfig.handleError));
  }

  public getProductsWithFilter(
    filter: string
  ): Observable<IApiResponse<IProduct[]>> {
    return this.httpClient.get<IApiResponse<IProduct[]>>(
      this.API_URL + '?filter=' + filter
    );
  }

  public getProductWithId(productId: string) {
    return this.httpClient.get<IApiResponse<IProduct>>(
      `${this.API_URL}/${productId}`
    );
  }

  public getAllProductColors(): Observable<IApiResponse<string[]>> {
    return this.httpClient.get<IApiResponse<string[]>>(
      `${this.API_URL}/colors`
    );
  }
}
