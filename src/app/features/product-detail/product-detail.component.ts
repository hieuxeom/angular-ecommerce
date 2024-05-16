import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsSectionComponent } from './components/details-section/details-section.component';

import { TabViewModule } from 'primeng/tabview';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';
import type { MenuItem } from 'primeng/api';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/ProductServices/product.service';
import type {
  IProduct,
  IProductComment,
  IProductReview,
} from '../../shared/interfaces/product';
import type { Observable } from 'rxjs';

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
  public tabItems: MenuItem[] = [
    { label: 'Comments', routerLink: ['/comments'] },
    {
      label: 'Reviews',
      routerLink: ['/reviews'],
    },
  ];

  public productId: string = '';
  public top4RelateTo: IProduct[] = [];
  public productDetails: IProduct | undefined;
  public productComments: IProductComment[] | undefined;
  public productReviews: IProductReview[] | undefined;

  constructor(
    private productApiService: ProductService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'] || '';

      if (!this.productId) {
        this._router.navigateByUrl('/product');
      }

      this.productApiService
        .getProductWithId(this.productId)
        .subscribe((response) => {
          this.productDetails = response.data;
          this.productComments = response.data.productComments;
          this.productReviews = response.data.productReviews;
        });
    });
  }

  ngOnInit() {
    this.productApiService.getAllProducts().subscribe((listProducts) => {
      this.top4RelateTo = listProducts.data.slice(0, 4);
    });
  }
}
