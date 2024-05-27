import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { ICartItem } from '../../../../shared/interfaces/user';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { apiUrl } from '../../../../shared/utils/apiUrl';
import { CartService } from '../../../../shared/services/CartServices/cart.service';

import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [CartService, ProductService],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnChanges {
  @Input() itemData: ICartItem | undefined;
  @Output() onDelete = new EventEmitter();
  @Output() onUpdateQuantity = new EventEmitter();

  @ViewChild('parentElement') parentElement!: ElementRef;

  public productId: string = '';
  public productName: string = '';
  public productPrice: number = 0;
  public productVariant: string = '';
  public productImage: string = '';
  public quantity: number = 1;
  public imageUrlPrefix = apiUrl;
  constructor(
    private productApiService: ProductService,
    private cartApiService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.productApiService
      .getProductWithId(this.itemData?.productId || '')
      .subscribe(({ data }) => {
        this.productId = data._id;
        this.productName = data.productName;
        this.productPrice = data.productPrice;
        this.productImage = data.productImage;
        this.productVariant = this.itemData?.productVariant || '';
        this.quantity = this.itemData?.quantity || 1;
      });
  }

  ngAfterViewInit(): void {
    console.log(this.parentElement.nativeElement);
  }
  public addQuantity() {
    this.quantity += 1;

    return this.cartApiService
      .updateNewQuantity({
        productId: this.productId,
        productVariant: this.productVariant,
        newQuantity: this.quantity,
      })
      .subscribe((response) => {
        this.onUpdateQuantity.emit({
          productId: this.productId,
          productVariant: this.productVariant,
          newQuantity: this.quantity,
        });
      });
  }

  public minusQuantity() {
    this.quantity -= 1;

    return this.cartApiService
      .updateNewQuantity({
        productId: this.productId,
        productVariant: this.productVariant,
        newQuantity: this.quantity,
      })
      .subscribe((response) => {
        this.onUpdateQuantity.emit({
          productId: this.productId,
          productVariant: this.productVariant,
          newQuantity: this.quantity,
        });
      });
  }

  public deleteProduct() {
    return this.cartApiService
      .deleteCartItem({
        productId: this.productId,
        productVariant: this.productVariant,
      })
      .subscribe((response) => {
        this.parentElement.nativeElement.remove();
        this.onDelete.emit({
          productId: this.productId,
          productVariant: this.productVariant,
        });
      });
  }
}
