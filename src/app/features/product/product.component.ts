import { FormsModule } from '@angular/forms';
import { DropdownModule, type DropdownChangeEvent } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterBoardComponent } from './components/filter-board/filter-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import {
  ProductsDataService,
  type IProduct,
} from '../../shared/services/products-data/products-data.service';
import { HrComponent } from '../../shared/components/hr/hr.component';
import { PaginatorModule, type PaginatorState } from 'primeng/paginator';
export type SortType =
  | 'most-popular'
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterBoardComponent,
    DropdownModule,
    ProductCardComponent,
    HrComponent,
    PaginatorModule,
  ],
  providers: [ProductsDataService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  public selectedSortMode: SortType = 'most-popular';
  public first: number = 0;
  public rows: number = 1;
  public currentPage = 0;
  public listSortMode = [
    { label: 'Most Popular', value: 'most-popular' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: Low to High', value: 'rating-asc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
  ];

  public productData: IProduct[] = [];

  public constructor(private productDataService: ProductsDataService) {
    this.productData = productDataService.getAllProducts();
  }

  public onChangeSort(event: DropdownChangeEvent) {}

  public onPageChange(event: PaginatorState) {
    this.currentPage = event?.page ? event?.page + 1 : 0;
  }
}
