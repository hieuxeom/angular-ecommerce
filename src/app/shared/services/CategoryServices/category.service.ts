import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api';
import { ICategory } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL = 'http://localhost:5000/api/categories';
  constructor(private httpClient: HttpClient) {}

  public getAllCategory() {
    return this.httpClient.get<IApiResponse<ICategory[]>>(this.API_URL);
  }

  public getCategoryById(categoryId: string) {
    return this.httpClient.get<IApiResponse<ICategory>>(
      `${this.API_URL}/${categoryId}`
    );
  }
}
