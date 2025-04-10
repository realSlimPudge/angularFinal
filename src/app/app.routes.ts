import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'products', component: ProductsPageComponent },
];
