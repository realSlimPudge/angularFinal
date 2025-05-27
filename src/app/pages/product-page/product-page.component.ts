import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model'; // Вынесенный интерфейс

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product?: Product;
  isInWishlist = false;
  isLoading = true;
  errorMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadProduct(id);
      this.checkWishlistStatus();
    });
  }

  private loadProduct(id: string) {
    this.isLoading = true;
    this.errorMessage = undefined;

    this.http
      .get<Product>(`http://localhost:1452/api/products/${id}`)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.checkWishlistStatus();
        },
        error: (err) => {
          this.errorMessage = 'Не удалось загрузить информацию о товаре';
          console.error('Error loading product:', err);
        },
        complete: () => (this.isLoading = false),
      });
  }

  private checkWishlistStatus() {
    if (this.product) {
      this.isInWishlist = this.wishlistService.isInWishlist(this.product.id);
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  toggleWishlist() {
    if (!this.product) return;

    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
    this.isInWishlist = !this.isInWishlist;
  }

  isInCart(): boolean {
    return this.product ? this.cartService.isInCart(this.product.id) : false;
  }
}
