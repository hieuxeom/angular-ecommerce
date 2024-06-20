import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { AdminService } from '../../services/AdminServices/admin.service';
import { IProduct } from '../../../../shared/interfaces/product';
import { formatDate } from '../../../../shared/utils/formatDate';
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
  public prefixImage: string = 'http://localhost:5000';

  public listProducts: IProduct[] = [];

  public activeDropdown: any[] = [
    {
      label: 'Active',
      value: true,
      class: 'text-success',
    },
    {
      label: 'Disabled',
      value: false,
      class: 'text-danger',
    },
  ];

  public mapStatusDropdownValue: { [key: string]: boolean } = {};

  public activeProducts: number = 0;
  public inactiveProducts: number = 0;

  public isShowEditDialog: boolean = false;
  public isShowCreateDialog: boolean = false;

  constructor(
    private _messageService: MessageService,
    private productService: ProductService,

    private adminService: AdminService
  ) {
    this.getListProducts();
  }

  private getListProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.listProducts = response.data.map((prod) => {
          return {
            ...prod,
            createdAt: formatDate(prod.createdAt),
            updatedAt: formatDate(prod.updatedAt),
          };
        });

        this.mapDropdown();

        this.calculateActivationProducts();
      },
    });
  }

  private mapDropdown() {
    this.listProducts.forEach((product) => {
      this.mapStatusDropdownValue[product._id] = product.isActive;
    });

    console.log(this.mapStatusDropdownValue);
  }

  private calculateActivationProducts() {
    this.activeProducts = this.listProducts.filter(
      (prod) => prod.isActive
    ).length;
    this.inactiveProducts = this.listProducts.filter(
      (prod) => !prod.isActive
    ).length;
  }

  public handleDropdownChange($event: any, product: IProduct) {
    const isActive = $event.value;

    product.isActive = isActive;

    this.productService.changeActivateStatus(product._id, isActive).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        this.calculateActivationProducts();
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
    this.productService.deleteProduct(productId).subscribe({
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
