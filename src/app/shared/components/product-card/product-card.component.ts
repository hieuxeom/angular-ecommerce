import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { IProduct } from '../../services/products-data/products-data.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productData?: IProduct;
  public productDiscountPrice: number = 0;

  ngOnInit() {
    if (this.productData) {
      this.productData.discountPercents = Number(
        this.productData.discountPercents
      );
      this.productData.productPrice = Number(this.productData.productPrice);

      if (this.productData.isDiscount) {
        this.productDiscountPrice =
          this.productData.productPrice -
          (this.productData.productPrice * this.productData.discountPercents) /
            100;
      }
    }
  }
}
