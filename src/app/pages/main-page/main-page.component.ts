import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-main-page',
  imports: [ButtonComponent, CategoryCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent { }
