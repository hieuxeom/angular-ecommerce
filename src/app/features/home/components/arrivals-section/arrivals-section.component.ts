import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import type { IProduct } from '../../../../shared/interfaces/product';
import { ProductService } from '../../../../shared/services/ProductServices/product.service';

@Component({
  selector: 'app-arrivals-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductService],
  templateUrl: './arrivals-section.component.html',
  styleUrl: './arrivals-section.component.css',
})
export class ArrivalsSectionComponent {
  public listProducts: IProduct[] = [];
  constructor(private productApiService: ProductService) {
    productApiService.getAllProducts().subscribe((listProducts) => {
      this.listProducts = listProducts.data;
    });
  }
}
