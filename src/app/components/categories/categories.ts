import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesItems } from '../categories-items/categories-items';
import { Categories as CategoriesService } from '../../services/categories';
@Component({
  selector: 'app-categories',
  imports: [CategoriesItems, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    await this.categoriesService.getAllCategories();
  }
}
