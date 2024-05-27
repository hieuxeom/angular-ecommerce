import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, OnChanges } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/CartServices/cart.service';
import { ICartItem } from '../../shared/interfaces/user';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../shared/services/ProductServices/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CartItemComponent,
    OrderSummaryComponent,
    ToastModule,
  ],
  providers: [CartService, MessageService, ProductService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnChanges {
  public listCartItems: ICartItem[] = [];
  public voucherCode: string = '';
  public subTotalPrice: number = 0;
  constructor(
    private cartApiService: CartService,
    private productApiService: ProductService,
    private _messageService: MessageService
  ) {
    this.fetchUserCart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.subTotalPrice = this.calculateSubTotal();
  }

  private fetchUserCart() {
    return this.cartApiService.getUserCart().subscribe((response) => {
      if (response) {
        this.listCartItems = response.data.cartItems;
        this.voucherCode = response.data.voucherCode;

        this.listCartItems.forEach((item) => {
          return this.productApiService
            .getProductWithId(item.productId)
            .subscribe((response) => {
              this.listCartItems.forEach((cartItem) => {
                if (cartItem.productId === response.data._id) {
                  cartItem.price = response.data.productPrice;
                }
              });
              this.subTotalPrice = this.calculateSubTotal();
            });
        });
      }
    });
  }

  public onDeleteItem({
    productId,
    productVariant,
  }: {
    productId: string;
    productVariant: string;
  }) {
    this.listCartItems = this.listCartItems.filter((item) => {
      if (item.productId !== productId) {
        return item;
      } else if (
        item.productId === productId &&
        item.productVariant !== productVariant
      ) {
        return item;
      } else {
        return;
      }
    });

    this.subTotalPrice = this.calculateSubTotal();
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Delete item successfully',
    });
  }

  public onUpdateQuantity({
    productId,
    productVariant,
    newQuantity,
  }: {
    productId: string;
    productVariant: string;
    newQuantity: number;
  }) {
    this.listCartItems.forEach((item) => {
      if (
        item.productId === productId &&
        item.productVariant === productVariant
      ) {
        item.quantity = newQuantity;
      }
    });
    this.subTotalPrice = this.calculateSubTotal();
  }

  public calculateSubTotal() {
    return this.listCartItems.reduce((prev, currentItem) => {
      return prev + currentItem.quantity * (currentItem.price ?? 0);
    }, 0);
  }
}
