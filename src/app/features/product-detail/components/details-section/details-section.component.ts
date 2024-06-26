import { IProductReview } from './../../../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  type OnChanges,
  type SimpleChange,
  type SimpleChanges,
} from '@angular/core';
import { HrComponent } from '../../../../shared/components/hr/hr.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import type {
  IProduct,
  IProductComment,
} from '../../../../shared/interfaces/product';
import { CartService } from '../../../../shared/services/CartServices/cart.service';
import { apiUrl } from '../../../../shared/utils/apiUrl';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HrComponent,
    InputNumberModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './details-section.component.html',
  styleUrl: './details-section.component.css',
})
export class DetailsSectionComponent implements OnChanges {
  @Input() productDetails: IProduct | undefined;

  public imageUrlPrefix = apiUrl;

  public productId: string = '';
  public selectedSize: string = 'S';
  public quantity: number = 1;
  public productName: string = '';
  public productPrice: number = 0;
  public isDiscount: boolean = false;
  public discountPercents: number = 0;
  public productImage: string = '';
  public productReviews: IProductReview[] = [];
  public productComments: IProductComment[] = [];
  public productRating = 5;
  public productStock: number = 0;
  public newPrice = 0;

  constructor(
    private cartApiService: CartService,
    private _messsageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.productDetails) {
      this.productId = this.productDetails._id;
      this.productName = this.productDetails.productName;
      this.productPrice = this.productDetails.productPrice;
      this.isDiscount = this.productDetails.isDiscount;
      this.discountPercents = this.productDetails.discountPercents;
      this.productImage = this.productDetails.productImage;
      this.productReviews = this.productDetails.productReviews;
      this.productComments = this.productDetails.productComments;
      this.productRating = this.productDetails.productRating;
      this.productStock = this.productDetails.productStock;

      if (this.isDiscount) {
        this.newPrice =
          this.productPrice * ((100 - this.discountPercents) / 100);
      }
    }
  }

  public onSelectSize(event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    return (this.selectedSize = element.getAttribute('data-size') || 'S');
  }

  public increaseQuantity() {
    return (this.quantity += 1);
  }

  public decreaseQuantity() {
    if (this.quantity === 0) {
      return;
    }
    return (this.quantity -= 1);
  }

  public addProductToCart() {
    this.cartApiService
      .addProductToCart({
        productId: this.productId,
        quantity: this.quantity,
        productVariant: this.selectedSize,
      })
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this._messsageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
          }
        },
        (err) => {
          this._messsageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login first',
          });
        }
      );
  }
}
