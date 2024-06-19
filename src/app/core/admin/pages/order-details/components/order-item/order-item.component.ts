import { Component, Input } from '@angular/core';
import { ProductService } from '../../../../../../shared/services/ProductServices/product.service';
import { IProduct } from '../../../../../../shared/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  @Input() quantity: number = 0;
  @Input() productId: string = '';
  @Input() productVariant: string = '';

  public productData: IProduct | undefined;

  public prefixImage: string = 'http://localhost:5000';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (response) => {
          this.productData = response.data;
        },
      });
    }
  }
}
