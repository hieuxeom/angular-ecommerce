import {CommonModule} from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, ActivatedRoute, Router} from '@angular/router';
import {SliderModule, type SliderChangeEvent} from 'primeng/slider';

import {HrComponent} from '../../../../shared/components/hr/hr.component';
import {CategoryService} from '../../../../shared/services/CategoryServices/category.service';
import type {ICategory} from '../../../../shared/interfaces/category';
import type {TypeFilter} from '../../../../shared/interfaces/product';
import {ProductService} from '../../../../shared/services/ProductServices/product.service';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-filter-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SliderModule,
    HrComponent,
    CheckboxModule,
  ],
  providers: [CategoryService, ProductService],
  templateUrl: './filter-board.component.html',
  styleUrl: './filter-board.component.css',
})
export class FilterBoardComponent {
  @Input() activeFilter: TypeFilter = 'all';
  @Input() isActivePriceFilter: boolean = false;

  public minValue: number = 0;
  public maxValue: number = 50000;
  public currentValue: number[] = [0, 10000];
  public listColors: string[] = [];

  public listCategories: ICategory[] = [];

  public constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.queryParams.subscribe({
      next: (params) => {
        if (params['filter']) {
          this.activeFilter = params['filter'];
        } else {
          this.activeFilter = 'all';
        }
      }
    });
  }

  public ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (listCategories) => {
        this.listCategories = listCategories.data;
      }
    });

    this.productService.getAllProductColors().subscribe({
      next: (response) => {
        this.listColors = response.data;
      }
    });
  }

  public onChangeValue(event: SliderChangeEvent) {
    this.currentValue = event.values || [];
  }

  public handleFilterWithPrice($event: any) {
    if (!$event.checked) {
      this._router.navigate([], {
        queryParams: {
          min: null,
          max: null,
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}
