import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../shared/services/ProductServices/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IProduct } from '../shared/interfaces/product';
import { apiUrl } from '../shared/utils/apiUrl';

import { CategoryService } from '../shared/services/CategoryServices/category.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  public productId: string = '';
  public productDetails: IProduct | null = null;
  public listCategories: any[] = [];
  public prefixImage: string = apiUrl;
  public editProductForm: FormGroup;

  public constructor(
    private _formBuilder: FormBuilder,
    private productService: ProductService,

    private categoryService: CategoryService,
    private _messageService: MessageService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.getListCategories();

    this.editProductForm = this._formBuilder.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productImage: ['', Validators.required],
      isDiscount: [false, Validators.required],
      discountPercents: [0, Validators.required],
      productCategory: ['', Validators.required],
      productColor: [''],
      productStock: [0, [Validators.required, Validators.min(1)]],
      isActive: [true, Validators.required],
    });

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
        this.productDetails = response.data;
        this.editProductForm.patchValue({
          productId: productId,
          productName: this.productDetails.productName,
          productPrice: this.productDetails.productPrice,
          isDiscount: this.productDetails.isDiscount,
          discountPercents: this.productDetails.discountPercents,
          productCategory: this.productDetails.productCategory,
          productColor: this.productDetails.productColor,
          productStock: this.productDetails.productStock,
          isActive: this.productDetails.isActive,
        });
      },
    });
  }

  public onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editProductForm.patchValue({
          productImage: reader.result,
        });
      };
    }
  }

  public handleEditProduct() {
    this.productService.editProduct(this.editProductForm.value).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this._router.navigate(['/admin', 'products']);
      },
      error: ({ error }) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
    });
  }
}
