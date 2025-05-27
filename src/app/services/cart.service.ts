// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  private totalItems = new BehaviorSubject<number>(0);

  totalItems$ = this.totalItems.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      product.quantity = 1;
      currentItems.push(product);
    }

    this.cartItems.next([...currentItems]);
    this.calculateTotals();
  }

  private calculateTotals() {
    const items = this.cartItems.value;

    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems.next(total);

    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadFromLocalStorage() {
    const items = localStorage.getItem('cart');
    if (items) {
      this.cartItems.next(JSON.parse(items));
      this.calculateTotals();
    }
  }

  updateQuantity(productId: number, delta: number) {
    const items = this.cartItems.value
      .map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    this.cartItems.next(items);
    this.calculateTotals();
  }

  isInCart(productId: number): boolean {
    return this.cartItems.value.some((item) => item.id === productId);
  }
  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart'); // или setItem('cart', '[]')
  }
  getCartItems() {
    return this.cartItems.asObservable();
  }

  constructor() {
    this.loadFromLocalStorage();
  }
  removeFromCart(productId: number) {
    const updatedItems = this.cartItems.value.filter(
      (item) => item.id !== productId,
    );
    this.cartItems.next(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  }
}
