import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesItems } from '../categories-items/categories-items';
import { CategoriesService } from '../../services/categories';

interface CategoriesResponse {
  id: number;
  name: string;
  description: string;
  fotoUrl: string;
  marketStallId: number;
  marketStall: {
    id: number;
    name: string;
    description: string;
    location: string;
    views: number;
    sellerId: number;
  };
  menus: {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    categoryId: number;
  }[];
}

@Component({
  selector: 'app-categories',
  imports: [CategoriesItems, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private categoriesService = inject(CategoriesService);
  categories = signal<CategoriesResponse[]>([]);

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    try {
      const categories = await this.categoriesService.getAllCategories();
      this.categories.set(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
      this.categories.set([]);
    }
  }
}
