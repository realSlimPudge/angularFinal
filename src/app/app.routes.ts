import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },

  { path: 'products', component: ProductsPageComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'favourite', component: FavouritePageComponent },
  { path: 'cart', component: CartPageComponent },
];
