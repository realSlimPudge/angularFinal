import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
};

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent, CommonModule],
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  categories: string[] = [
    'Смартфоны',
    'Планшеты',
    'Часы',
    'Аксессуары',
    'Гаджеты',
    'Компьютеры',
  ];
  baseImageUrl = 'http://localhost:1452/';
  products: Product[] = [];
  selectedCategories = new Set<string>(this.categories);
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('http://localhost:1452/api/products').subscribe({
      next: (data) => {
        this.allProducts = data;
        this.filterProducts();
      },
      error: (err) => console.error('Error', err),
    });
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }

    this.filterProducts();
  }

  private filterProducts() {
    if (this.selectedCategories.size === 0) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.allProducts.filter((product) =>
      this.selectedCategories.has(product.category),
    );
  }

  getImageUrl(imagePath: string): string {
    return `${this.baseImageUrl}${imagePath}`;
  }
}
