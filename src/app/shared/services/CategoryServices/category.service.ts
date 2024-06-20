import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../../interfaces/api';
import { ICategory } from '../../interfaces/category';
import { HttpConfigService } from '../HttpConfig/http-config.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL = 'http://localhost:5000/api/categories';
  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getAllCategories(onlyActive: boolean = true) {
    return this.httpClient.get<IApiResponse<ICategory[]>>(
      `${this.API_URL}?onlyActive=${onlyActive}`
    );
  }

  public getCategoryById(categoryId: string) {
    return this.httpClient.get<IApiResponse<ICategory>>(
      `${this.API_URL}/${categoryId}`
    );
  }

  public changeActivateStatus(categoryId: string, isActive: number) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/${categoryId}/activate`,
      {
        isActive,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  public editCategory(editCategoryForm: FormGroup) {
    return this.httpClient.put<IApiResponse>(
      `${this.API_URL}/`,
      editCategoryForm,
      this._httpConfig.getHttpOptions()
    );
  }

  public createNewCategory(createCategoryForm: FormGroup) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_URL}`,
      createCategoryForm,
      this._httpConfig.getHttpOptions()
    );
  }

  public deleteCategory(categoryId: string) {
    return this.httpClient.delete<IApiResponse>(
      `${this.API_URL}/${categoryId}`,
      this._httpConfig.getHttpOptions()
    );
  }
}
