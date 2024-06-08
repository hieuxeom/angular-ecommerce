import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import { IProduct } from '../../../../shared/interfaces/product';
import { ICartItem } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-item.component.html',
  styleUrl: './review-item.component.css',
})
export class ReviewItemComponent {
  @Input() itemData!: ICartItem;

  public productData!: IProduct;
  constructor(private productApiService: ProductService) {}

  ngOnInit() {
    this.productApiService
      .getProductById(this.itemData.productId)
      .subscribe((response) => {
        this.productData = response.data;
      });
  }
}
