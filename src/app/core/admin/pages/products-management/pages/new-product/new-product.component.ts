import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../../../../shared/services/CategoryServices/category.service';
import { ProductService } from '../../../../../../shared/services/ProductServices/product.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  public createProductForm: FormGroup;
  public listCategories: any = [];

  constructor(
    private _formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private _messageService: MessageService,
    private _router: Router
  ) {
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

  public onFileChange(event: any, form: string) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.createProductForm.patchValue({
          productImage: reader.result,
        });
      };
    }
  }

  public handleCreateProduct() {
    this.productService
      .createNewProduct(this.createProductForm.value)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });

          setTimeout(() => {
            this._router.navigate(['/admin', 'products']);
          }, 1500);
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
