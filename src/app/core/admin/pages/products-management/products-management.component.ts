import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { AdminService } from '../../services/AdminServices/admin.service';
import { IProduct } from '../../../../shared/interfaces/product';
import { formatDate } from '../../../../shared/utils/formatDate';
import { CategoryService } from '../../../../shared/services/CategoryServices/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

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
    RouterModule,
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

  constructor(
    private _messageService: MessageService,
    private productServices: ProductService,
    private categoryService: CategoryService,
    private adminService: AdminService
  ) {
    this.getListProducts();
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
