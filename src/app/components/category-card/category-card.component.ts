import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() category: string = '';
  private categoryEndpointMap: { [key: string]: number } = {
    Phones: 2,
    Headphones: 1,
    Computers: 3,
    Tablets: 4,
    Smart_Wathces: 5,
    Gadgets: 6,
  };
  get categoryEndpoint(): number {
    return this.categoryEndpointMap[this.category] || 1;
  }
}
