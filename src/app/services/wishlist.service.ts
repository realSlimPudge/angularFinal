// services/wishlist.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistItems = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  addToWishlist(product: Product): void {
    const currentItems = this.wishlistItems.getValue();
    if (!currentItems.find((item) => item.id === product.id)) {
      const newItems = [...currentItems, product];
      this.wishlistItems.next(newItems);
      this.saveToLocalStorage(newItems);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.value.some((item) => item.id === productId);
  }
  removeFromWishlist(productId: number): void {
    const currentItems = this.wishlistItems.getValue();
    const newItems = currentItems.filter((item) => item.id !== productId);
    this.wishlistItems.next(newItems);
    this.saveToLocalStorage(newItems);
  }

  getWishlistItems(): Observable<Product[]> {
    return this.wishlistItems.asObservable();
  }

  private saveToLocalStorage(items: Product[]): void {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }

  private loadFromLocalStorage(): void {
    const items = localStorage.getItem('wishlist');
    if (items) {
      this.wishlistItems.next(JSON.parse(items));
    }
  }
}
