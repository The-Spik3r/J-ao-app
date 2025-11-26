import { Component, input, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-items',
  imports: [],
  templateUrl: './categories-items.html',
  styleUrl: './categories-items.css',
})
export class CategoriesItems {
  private router = inject(Router);

  id = input.required<number>();
  title = input.required<string>();
  imageUrl = input<string>();
  imageError = signal(false);

  handleImageError() {
    this.imageError.set(true);
  }

  navigateToCategory() {
    this.router.navigate(['/category', this.id()]);
  }
}
