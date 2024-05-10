import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DetailsSectionComponent } from './components/details-section/details-section.component';

import { TabViewModule } from 'primeng/tabview';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';
import type { MenuItem } from 'primeng/api';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/ProductServices/product.service';
import type { IProduct } from '../../shared/interfaces/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    DetailsSectionComponent,
    CommentsSectionComponent,
    ReviewsSectionComponent,
    ProductCardComponent,
  ],
  providers: [ProductService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  public productId: string = '';
  public tabItems: MenuItem[] = [];
  public top4RelateTo: IProduct[] = [];
  constructor(
    private route: ActivatedRoute,
    private productApiService: ProductService
  ) {
    console.log('vcl hihi');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId') || '';
    });

    this.tabItems = [
      { label: 'Comments', routerLink: ['/comments'] },
      {
        label: 'Reviews',
        routerLink: ['/reviews'],
      },
    ];
    this.productApiService.getAllProducts().subscribe((listProducts) => {
      this.top4RelateTo = listProducts.data.slice(0, 4);
    });
  }
}
