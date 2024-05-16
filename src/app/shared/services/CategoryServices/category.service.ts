import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public API_URL = 'http://localhost:5000/api/categories';
  constructor(private httpClient: HttpClient) {}

  public getAllCategory(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }
}
