import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AdminService } from '../../services/AdminServices/admin.service';

import { CategoryService } from '../../../../shared/services/CategoryServices/category.service';
import { ICategory } from '../../../../shared/interfaces/category';
import { formatDate } from '../../../../shared/utils/formatDate';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './categories-management.component.html',
  styleUrl: './categories-management.component.css',
})
export class CategoriesManagementComponent {
  public isShowEditDialog = false;
  public isShowCreateDialog = false;

  public listCategories: ICategory[] = [];

  public activeDropdown: any[] = [
    {
      label: 'Active',
      value: 1,
      class: 'text-success',
    },
    {
      label: 'Disabled',
      value: 0,
      class: 'text-danger',
    },
  ];

  public mapStatusDropdownValue: { [key: string]: number } = {};

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

  private mapDropdown() {
    this.listCategories.forEach((category) => {
      this.mapStatusDropdownValue[category._id] = category.isActive;
    });
  }

  private getListCategories() {
    this.categoryService.getAllCategories(false).subscribe({
      next: (response) => {
        this.listCategories = response.data.map((category) => {
          return {
            ...category,
            createdAt: formatDate(category.createdAt),
            updatedAt: formatDate(category.updatedAt),
          };
        });

        this.mapDropdown();
        this.calculateActivatedCategories();
      },
    });
  }

  private calculateActivatedCategories() {
    this.inactiveCategories = this.listCategories.filter(
      (_c) => _c.isActive === 0
    ).length;
    this.activeCategories = this.listCategories.filter(
      (_c) => _c.isActive === 1
    ).length;
  }

  private getEditCategoryDetails(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        const categoryData = response.data;
        console.log(categoryData);
        this.editCategoryForm.patchValue({
          categoryId,
          categoryName: categoryData.categoryName,
          queryParams: categoryData.queryParams,
          isActive: categoryData.isActive === 1 ? true : false,
        });
      },
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
    this.adminService.editCategory(this.editCategoryForm.value).subscribe({
      next: (response) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully edited the category',
        });
        this.isShowEditDialog = false;
        this.getListCategories();
      },
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
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully created new category',
          });
          this.isShowCreateDialog = false;
          this.getListCategories();
        },
      });
  }

  public handleDropdownChange(event: any, category: any) {
    const isActive = event.value;
    category.isActive = isActive;
    this.adminService
      .changeCategoryActivateStatus(category._id, isActive)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.calculateActivatedCategories();
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
