import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { WishlistService } from '../../services/wishlist.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourite-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './favourite-page.component.html',
  styleUrl: './favourite-page.component.css',
})
export class FavouritePageComponent {
  favourites: Product[] = [];

  constructor(private wishlistService: WishlistService) {
    this.wishlistService.getWishlistItems().subscribe((items) => {
      this.favourites = items;
    });
  }
}
