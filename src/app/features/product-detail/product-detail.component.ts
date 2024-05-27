import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsSectionComponent } from './components/details-section/details-section.component';

import { TabViewModule, type TabViewChangeEvent } from 'primeng/tabview';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';
import { MessageService, type MenuItem } from 'primeng/api';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../shared/services/ProductServices/product.service';
import type {
  IProduct,
  IProductComment,
  IProductReview,
} from '../../shared/interfaces/product';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommentService } from '../../shared/services/CommentServices/comment.service';
import { ReviewService } from '../../shared/services/ReviewServices/review.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { StarRateComponent } from './components/star-rate/star-rate.component';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    FormsModule,
    DetailsSectionComponent,
    CommentsSectionComponent,
    ReviewsSectionComponent,
    StarRateComponent,
    ProductCardComponent,
    InputTextModule,
    DialogModule,
    ToastModule,
  ],
  providers: [
    ProductService,
    CommentService,
    ReviewService,
    MessageService,
    AuthService,
  ],
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

  public currentTab: number = 0;

  public visibleCommentDialog: boolean = false;
  public visibleReviewDialog: boolean = false;

  public productId: string = '';
  public top4RelateTo: IProduct[] = [];
  public productDetails: IProduct | undefined;
  public productComments: IProductComment[] | undefined;
  public productReviews: IProductReview[] | undefined;
  public commentContent: string = '';
  public reviewStar: number = 0;
  public reviewContent: string = '';

  public isLoggedIn!: boolean;

  constructor(
    private productApiService: ProductService,
    private commentApiService: CommentService,
    private reviewApiService: ReviewService,
    private authApiService: AuthService,
    private _messageService: MessageService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'] || '';

      if (!this.productId) {
        this._router.navigateByUrl('/product');
      }

      this.productApiService.getProductWithId(this.productId).subscribe(
        (response) => {
          this.productDetails = response.data;
          this.productComments = response.data.productComments;
          this.productReviews = response.data.productReviews;
        },
        (error) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
          this._router.navigateByUrl('/home');
        }
      );
    });

    this.productApiService.getAllProducts().subscribe((listProducts) => {
      this.top4RelateTo = listProducts.data.slice(0, 4);
    });

    this.isLoggedIn = this.authApiService.isLoggedIn();
  }

  ngOnInit() {}

  public handleStarChange(event: number) {
    this.reviewStar = event;
  }

  public changeCurrentTab(event: TabViewChangeEvent) {
    this.currentTab = event.index;
  }
  public showCommentDialog() {
    this.visibleCommentDialog = true;
  }
  public hideCommentDialog() {
    this.visibleCommentDialog = false;
  }

  public handleSubmitComment() {
    this.commentApiService
      .createNewComment(this.productId, this.commentContent)
      .subscribe((response) => {
        if (response.status === 'success') {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          return setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          return this._messageService.add({
            severity: 'error',
            summary: 'Success',
            detail: response.message,
          });
        }
      });
  }

  public showReviewDialog() {
    this.visibleReviewDialog = true;
  }
  public hideReviewDialog() {
    this.visibleReviewDialog = false;
  }

  public handleSubmitReview() {
    this.reviewApiService
      .createNewReview(this.productId, {
        reviewContent: this.reviewContent,
        reviewStar: this.reviewStar,
      })
      .subscribe((response) => {
        if (response.status === 'success') {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          return setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          return this._messageService.add({
            severity: 'error',
            summary: 'Success',
            detail: response.message,
          });
        }
      });
  }
}
