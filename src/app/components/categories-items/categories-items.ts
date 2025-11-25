import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-categories-items',
  imports: [],
  templateUrl: './categories-items.html',
  styleUrl: './categories-items.css',
})
export class CategoriesItems {
  title = input.required<string>();
  imageUrl = input<string>();
  imageError = signal(false);

  handleImageError() {
    this.imageError.set(true);
  }
}
