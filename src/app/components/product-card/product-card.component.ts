import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() brand: string = '';
  @Input() routerLink: (string | number)[] = [];
}
