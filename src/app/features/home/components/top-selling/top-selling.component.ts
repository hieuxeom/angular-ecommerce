import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import {
  ProductsDataService,
  type IProduct,
} from '../../services/products-data/products-data.service';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductsDataService],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css',
})
export class TopSellingComponent {
  public listProducts: IProduct[] = [];
  constructor(private productService: ProductsDataService) {
    this.listProducts = productService.getAllProducts();
  }
}
