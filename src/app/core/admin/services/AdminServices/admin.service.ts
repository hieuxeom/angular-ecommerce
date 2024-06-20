import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from '../../../../shared/services/HttpConfig/http-config.service';
import { IApiResponse } from '../../../../shared/interfaces/api';
import { IUser } from '../../../../shared/interfaces/user';

interface IEditCategoryForm {
  categoryId: string;
  categoryName: string;
  queryParams: string;
  isActive: string;
}

interface ICreateCategoryForm {
  categoryName: string;
  queryParams: string;
  isActive: string;
}

interface ICreateProductForm {
  productName: string;
  productPrice: number;
  productImage: string;
  isDiscount: boolean;
  discountPercents: number;
  productCategory: string;
  productColor: string;
  productStock: number;
  isActive: boolean;
}

interface IEditProductForm extends ICreateProductForm {
  productId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_USER: string = 'http://localhost:5000/api/users';
  private API_CATEGORY: string = 'http://localhost:5000/api/categories';
  private API_PRODUCT: string = 'http://localhost:5000/api/products';

  constructor(
    private httpClient: HttpClient,
    private _httpConfig: HttpConfigService
  ) {}

  public getAllUsers() {
    return this.httpClient.get<IApiResponse<IUser[]>>(
      this.API_USER,
      this._httpConfig.getHttpOptions()
    );
  }

  public deactivateUser(userId: string) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_USER}/deactivate`,
      {
        userId,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  public reactivateUser(userId: string) {
    return this.httpClient.post<IApiResponse>(
      `${this.API_USER}/reactivate`,
      {
        userId,
      },
      this._httpConfig.getHttpOptions()
    );
  }

  public editCategory(editCategoryForm: IEditCategoryForm) {
    return this.httpClient.put(
      `${this.API_CATEGORY}/`,
      editCategoryForm,
      this._httpConfig.getHttpOptions()
    );
  }

  public createNewCategory(createCategoryForm: ICreateCategoryForm) {
    return this.httpClient.post(
      `${this.API_CATEGORY}`,
      createCategoryForm,
      this._httpConfig.getHttpOptions()
    );
  }
}
