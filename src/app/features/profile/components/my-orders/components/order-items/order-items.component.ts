import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../../../shared/interfaces/product';
import { ProductService } from '../../../../../../shared/services/ProductServices/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css',
})
export class OrderItemsComponent {
  @Input() productId: string | null = null;
  @Input() productVariant: string | null = null;
  @Input() quantity: number | null = null;

  public prefixImage: string = 'http://localhost:5000';

  public productData: IProduct | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductDetails();
  }

  private getProductDetails() {
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((response) => {
          this.productData = response.data;
          console.log(this.productData);
        });
    }
  }
}
