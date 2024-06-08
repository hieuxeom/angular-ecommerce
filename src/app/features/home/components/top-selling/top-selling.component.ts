import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';
import type { IProduct } from '../../../../shared/interfaces/product';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductService],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
})
export class TopSellingComponent {
  public listProducts: IProduct[] = [];
  constructor(private productApiService: ProductService) {
    this.productApiService.getTopSell().subscribe((response) => {
      this.listProducts = response.data;
    });
  }
}
