import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  public quantity: number = 1;

  public addQuantity() {
    return (this.quantity += 1);
  }

  public minusQuantity() {
    return (this.quantity -= 1);
  }
}
