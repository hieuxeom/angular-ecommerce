import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../../../../shared/services/CategoryServices/category.service';
import { IProduct } from '../../../../../../shared/interfaces/product';
import { ProductService } from '../../../../../../shared/services/ProductServices/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { apiUrl } from '../../../../../../shared/utils/apiUrl';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownModule, ToastModule],
  providers: [MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  public listCategories: any = [];
  public productId: string = '';
  public productDetails: IProduct | null = null;
  public prefixImage = apiUrl;

  public constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) {
    this.getListCategories();

    this._route.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('productId') || '';

        if (this.productId) {
          this.getProductDetails(this.productId);
        }
      },
    });
  }

  private getListCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.listCategories = response.data.map((_cat) => {
          return {
            label: _cat.categoryName,
            value: _cat.queryParams,
          };
        });
      },
    });
  }

  private getProductDetails(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.productDetails = response.data;
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      },
    });
  }
}
