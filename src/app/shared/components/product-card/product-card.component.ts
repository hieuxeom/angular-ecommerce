import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productName?: string;
  @Input() isDiscount?: boolean;
  @Input() discountPercents?: string | number;
  @Input() productPrice?: string | number;
  @Input() productImage?: string;
  @Input() productRating?: number;
  public productDiscountPrice: number = 0;
  ngOnInit() {
    this.discountPercents = Number(this.discountPercents);
    this.productPrice = Number(this.productPrice);

    if (this.isDiscount) {
      this.productDiscountPrice =
        this.productPrice - (this.productPrice * this.discountPercents) / 100;
    }
  }
}
