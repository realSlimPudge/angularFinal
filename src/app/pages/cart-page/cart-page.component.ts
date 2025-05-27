import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  imports: [CommonModule],
})
export class CartPageComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice = 0;
  totalItems = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  ngOnInit() {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    this.totalItems = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }

  updateQuantity(item: Product, delta: number) {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, delta);
      this.calculateTotal();
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.calculateTotal();
  }

  checkout() {
    this.cartService.clearCart();
    this.calculateTotal();
  }
}
