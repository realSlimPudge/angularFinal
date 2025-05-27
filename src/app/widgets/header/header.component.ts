// header.component.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalItems$;
  wishlistCount = 0;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {
    this.totalItems$ = this.cartService.totalItems$;
  }

  ngOnInit() {
    this.wishlistService.getWishlistItems().subscribe((items) => {
      this.wishlistCount = items.length;
    });
  }
}
