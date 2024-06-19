import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { AdminService } from '../../services/AdminServices/admin.service';
import { IProduct } from '../../../../shared/interfaces/product';
import { formatDate } from '../../../../shared/utils/formatDate';
import { ScrollToTopService } from '../../../../shared/services/ScrollToTop/scroll-to-top.service';
import { CategoryService } from '../../../../shared/services/CategoryServices/category.service';
import { ICategory } from '../../../../shared/interfaces/category';
import { response } from 'express';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css',
})
export class ProductsManagementComponent {
  @ViewChild('imageNewInput') imageNewInput!: ElementRef;
  @ViewChild('imageEditInput') imageEditInput!: ElementRef;
  public prefixImage: string = 'http://localhost:5000';

  public listProducts: IProduct[] = [];
  public listCategories: any = [];

  public activeProducts: number = 0;
  public inactiveProducts: number = 0;

  public isShowEditDialog: boolean = false;
  public isShowCreateDialog: boolean = false;

  public createProductForm: FormGroup;
  public editProductForm: FormGroup;

  private selectedFile: File | null = null;

  constructor(
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _scrollService: ScrollToTopService,
    private productServices: ProductService,
    private categoryService: CategoryService,
    private adminService: AdminService
  ) {
    this.getListProducts();
    this.getListCategories();

    this.createProductForm = this._formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productImage: ['', Validators.required],
      isDiscount: [false, Validators.required],
      discountPercents: [0, Validators.required],
      productCategory: ['', Validators.required],
      productColor: ['#FFF'],
      productStock: [0, [Validators.required, Validators.min(1)]],
      isActive: [true, Validators.required],
    });

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

    const discountPercentsControl =
      this.createProductForm.get('discountPercents');

    discountPercentsControl?.disable();
    this.createProductForm.get('isDiscount')?.valueChanges.subscribe({
      next: (isDiscount) => {
        if (isDiscount) {
          discountPercentsControl?.enable();
        } else {
          discountPercentsControl?.disable();
        }
      },
    });
  }

  public onFileChange(event: any, form: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      //  this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        switch (form) {
          case 'edit':
            this.editProductForm.patchValue({
              productImage: reader.result,
            });
            break;

          case 'create':
            this.createProductForm.patchValue({
              productImage: reader.result,
            });
            break;
          default:
            break;
        }
      };
    }
  }

  private getListProducts() {
    this.productServices.getAllProducts().subscribe({
      next: (response) => {
        this.listProducts = response.data.map((prod) => {
          return {
            ...prod,
            createdAt: formatDate(prod.createdAt),
            updatedAt: formatDate(prod.updatedAt),
          };
        });
        this.activeProducts = this.listProducts.filter(
          (prod) => prod.isActive
        ).length;
        this.inactiveProducts = this.listProducts.filter(
          (prod) => !prod.isActive
        ).length;
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
    this.productServices.getProductById(productId).subscribe({
      next: (response) => {
        const prodData = response.data;
        this.editProductForm.patchValue({
          productId: productId,
          productName: prodData.productName,
          productPrice: prodData.productPrice,
          isDiscount: prodData.isDiscount,
          discountPercents: prodData.discountPercents,
          productCategory: prodData.productCategory,
          productColor: prodData.productColor,
          productStock: prodData.productStock,
          isActive: prodData.isActive,
        });
      },
    });
  }

  public handleShowCreateDialog() {
    this.isShowCreateDialog = true;
  }

  public handleCloseCreateDialog() {
    this.isShowCreateDialog = false;
    this.createProductForm.reset();
    this.imageNewInput.nativeElement.value = '';
  }

  public handleShowEditDialog(productId: string) {
    this.isShowEditDialog = true;
    this._scrollService.scrollToTop();
    this.getProductDetails(productId);
  }

  public handleCloseEditDialog() {
    this.isShowEditDialog = false;
    this.editProductForm.reset();
    this.imageEditInput.nativeElement.value = '';
  }

  public handleDeactivateProduct(productId: string) {
    this.adminService.deactivateProduct(productId).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getListProducts();
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
  public handleReactivateProduct(productId: string) {
    this.adminService.reactivateProduct(productId).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getListProducts();
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

  public handleEditProduct() {
    this.adminService.editProductDetails(this.editProductForm.value).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.handleCloseEditDialog();
        this.getListProducts();
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

  public handleCreateProduct() {
    console.log(this.createProductForm.value);

    this.adminService.createNewProduct(this.createProductForm.value).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.handleCloseCreateDialog();
        this.getListProducts();
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

  public handleDeleteProduct(productId: string) {
    this.adminService.deleteProduct(productId).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.getListProducts();
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
