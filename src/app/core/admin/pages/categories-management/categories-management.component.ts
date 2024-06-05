import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminService } from '../../services/AdminServices/admin.service';

import { IProduct } from '../../../../shared/interfaces/product';
import { CategoryService } from '../../../../shared/services/CategoryServices/category.service';
import { ICategory } from '../../../../shared/interfaces/category';
import { formatDate } from '../../../../shared/utils/formatDate';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RippleModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './categories-management.component.html',
  styleUrl: './categories-management.component.css',
})
export class CategoriesManagementComponent {
  public isShowEditDialog = false;
  public isShowCreateDialog = false;

  public listCategories: ICategory[] = [];
  public activeCategories: number = 0;
  public inactiveCategories: number = 0;

  public editCategoryForm: FormGroup;
  public createCategoryForm: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private adminService: AdminService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {
    this.getListCategories();

    this.editCategoryForm = this._formBuilder.group({
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      queryParams: ['', Validators.required],
      isActive: ['', Validators.required],
    });

    this.createCategoryForm = this._formBuilder.group({
      categoryName: ['', Validators.required],
      queryParams: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  private getListCategories() {
    this.categoryService.getAllCategory().subscribe((response) => {
      this.listCategories = response.data.map((category) => {
        return {
          ...category,
          createdAt: formatDate(category.createdAt),
          updatedAt: formatDate(category.updatedAt),
        };
      });

      this.inactiveCategories = this.listCategories.filter(
        (_c) => _c.isActive === 0
      ).length;
      this.activeCategories = this.listCategories.filter(
        (_c) => _c.isActive === 1
      ).length;
    });
  }

  private getEditCategoryDetails(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe((response) => {
      const categoryData = response.data;
      console.log(categoryData);
      this.editCategoryForm.patchValue({
        categoryId,
        categoryName: categoryData.categoryName,
        queryParams: categoryData.queryParams,
        isActive: categoryData.isActive === 1 ? true : false,
      });
    });
  }

  public handleDeactivateCategory(categoryId: string) {
    this.adminService.deactivateCategory(categoryId).subscribe((response) => {
      this._messageService.add({
        severity: 'error',
        summary: 'Deactivate',
        detail: response.message,
      });
      this.getListCategories();
    });
  }

  public handleReactivateCategory(categoryId: string) {
    this.adminService.reactivateCategory(categoryId).subscribe((response) => {
      this._messageService.add({
        severity: 'success',
        summary: 'Reactivate',
        detail: response.message,
      });
      this.getListCategories();
    });
  }

  public handleShowEditDialog(categoryId: string) {
    this.isShowEditDialog = true;
    this.getEditCategoryDetails(categoryId);
  }

  public handleCloseEditDialog() {
    this.editCategoryForm.reset();
    return (this.isShowEditDialog = false);
  }

  public handleSave() {
    this.adminService
      .editCategory(this.editCategoryForm.value)
      .subscribe((response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully edited the category',
        });
        this.isShowEditDialog = false;
        this.getListCategories();
      });
  }

  public handleShowCreateDialog() {
    this.isShowCreateDialog = true;
  }

  public handleCloseCreateDialog() {
    this.createCategoryForm.reset();
    return (this.isShowCreateDialog = false);
  }

  public handleCreate() {
    this.adminService
      .createNewCategory(this.createCategoryForm.value)
      .subscribe((response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully created new category',
        });
        this.isShowCreateDialog = false;
        this.getListCategories();
      });
  }
}
