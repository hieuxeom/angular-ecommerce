import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

// Define the ProductService
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public API_URL = 'http://localhost:5000/api/products';

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<any> {
    // Specify the return type Observable<any>
    return this.httpClient.get(this.API_URL);
  }
}
