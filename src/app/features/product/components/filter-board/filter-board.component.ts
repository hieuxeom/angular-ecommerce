import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SliderModule, type SliderChangeEvent } from 'primeng/slider';

import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { CategoryService } from '../../../../shared/services/CategoryServices/category.service';
import type { ICategory } from '../../../../shared/interfaces/category';
import type { TypeFilter } from '../../../../shared/interfaces/product';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { CheckboxModule } from 'primeng/checkbox';

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

  public minValue: number = 0;
  public maxValue: number = 10000;
  public currentValue: number[] = [50, 1000];
  public listColors: string[] = [];

  public listCategories: ICategory[] = [];

  public filterWithPrice: boolean = false;

  public constructor(
    private categoryApiService: CategoryService,
    private productApiService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['filter']) {
        this.activeFilter = params['filter'];
      } else {
        this.activeFilter = 'all';
      }
    });
  }

  public ngOnInit() {
    this.categoryApiService.getAllCategory().subscribe((listCategories) => {
      this.listCategories = listCategories.data;
    });

    this.productApiService.getAllProductColors().subscribe((response) => {
      this.listColors = response.data;
    });
  }

  public onChangeValue(event: SliderChangeEvent) {
    this.currentValue = event.values || [];
  }
}
