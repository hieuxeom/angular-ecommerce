import {FormsModule} from '@angular/forms';
import {DropdownModule, type DropdownChangeEvent} from 'primeng/dropdown';
import {CommonModule} from '@angular/common';
import {Component, SimpleChanges, type AfterContentInit} from '@angular/core';
import {FilterBoardComponent} from './components/filter-board/filter-board.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ProductCardComponent} from '../../shared/components/product-card/product-card.component';

import {HrComponent} from '../../shared/components/hr/hr.component';
import {PaginatorModule, type PaginatorState} from 'primeng/paginator';
import {ProductService} from '../../shared/services/ProductServices/product.service';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import type {TypeFilter, IProduct} from '../../shared/interfaces/product';

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
    HttpClientModule,
  ],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  public first: number = 0;
  public rows: number = 1;
  public currentPage = 0;

  public selectedSortMode: SortType = 'most-popular';

  public listSortMode = [
    {label: 'Most Popular', value: 'most-popular'},
    {label: 'Price: Low to High', value: 'price-asc'},
    {label: 'Price: High to Low', value: 'price-desc'},
    {label: 'Rating: Low to High', value: 'rating-asc'},
    {label: 'Rating: High to Low', value: 'rating-desc'},
  ];

  public productData: IProduct[] = [];

  public activeFilter: TypeFilter = 'all';

  public isActivePriceFilter: boolean = false;

  public constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params['min'] && params['max']) {
          this.isActivePriceFilter = true;
        }

        if (params) {
          
          this.productService
            .getProductsWithFilter(params)
            .subscribe({
              next: (response) => {
                this.productData = response.data;
              }
            });
        } else {
          this.productService.getAllProducts().subscribe({
            next: (listProducts) => {
              this.productData = listProducts.data;
            }
          });
        }
      }
    });
  }

  public ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public onChangeSort($event: any) {
  }

  public onPageChange(event: PaginatorState) {
    this.currentPage = event?.page ? event?.page + 1 : 0;
  }
}
