import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import {
  ProductsDataService,
  type IProduct,
} from '../../services/products-data/products-data.service';

@Component({
  selector: 'app-arrivals-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductsDataService],
  templateUrl: './arrivals-section.component.html',
  styleUrl: './arrivals-section.component.css',
})
export class ArrivalsSectionComponent {
  public listProducts: IProduct[] = [];
  constructor(private productService: ProductsDataService) {
    this.listProducts = productService.getAllProducts();
  }
}
