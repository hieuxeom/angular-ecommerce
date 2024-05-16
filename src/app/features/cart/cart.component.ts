import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  public cartItemSample = Array.from({ length: 4 });
}
