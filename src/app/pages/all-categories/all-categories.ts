import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search, Grid, List } from 'lucide-angular';
import { CategoriesService } from '../../services/categories';
import { CategoriesItems } from '../../components/categories-items/categories-items';

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
  selector: 'app-all-categories',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CategoriesItems],
  templateUrl: './all-categories.html',
  styleUrl: './all-categories.css',
})
export class AllCategories implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly Grid = Grid;
  readonly List = List;

  private router = inject(Router);
  private categoriesService = inject(CategoriesService);

  categories = signal<CategoriesResponse[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  searchTerm = signal<string>('');
  filteredCategories = signal<CategoriesResponse[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');

  ngOnInit() {
    this.loadAllCategories();
  }

  private async loadAllCategories() {
    this.loading.set(true);
    try {
      const categories = await this.categoriesService.getAllCategories();
      this.categories.set(categories);
      this.filteredCategories.set(categories);
    } catch (error) {
      this.error.set('Error loading categories');
      console.error('Error loading categories:', error);
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();
    this.searchTerm.set(searchValue);

    if (searchValue === '') {
      this.filteredCategories.set(this.categories());
    } else {
      const filtered = this.categories().filter(
        (category) =>
          category.name.toLowerCase().includes(searchValue) ||
          category.description.toLowerCase().includes(searchValue)
      );
      this.filteredCategories.set(filtered);
    }
  }

  clearSearch() {
    this.searchTerm.set('');
    this.filteredCategories.set(this.categories());
  }

  sortByName() {
    const sorted = [...this.filteredCategories()].sort((a, b) => a.name.localeCompare(b.name));
    this.filteredCategories.set(sorted);
  }

  showAll() {
    this.filteredCategories.set(this.categories());
    this.searchTerm.set('');
  }

  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  navigateToCategory(categoryId: number) {
    // TODO: Navigate to category detail or menus filtered by category
    console.log('Navigate to category:', categoryId);
    // this.router.navigate(['/category', categoryId]);
  }
}
