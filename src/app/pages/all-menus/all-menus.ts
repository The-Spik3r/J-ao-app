import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search, Filter } from 'lucide-angular';
import { MenusService } from '../../services/menus';
import { MenuItems } from '../../components/menu-items/menu-items';

interface MenuResponse {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  isFeatured: boolean;
}

@Component({
  selector: 'app-all-menus',
  imports: [CommonModule, LucideAngularModule, MenuItems],
  templateUrl: './all-menus.html',
  styleUrl: './all-menus.css',
})
export class AllMenus implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly Filter = Filter;

  private router = inject(Router);
  private menusService = inject(MenusService);

  menus = signal<MenuResponse[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  searchTerm = signal<string>('');
  filteredMenus = signal<MenuResponse[]>([]);

  async ngOnInit() {
    await this.loadAllMenus();
  }

  private async loadAllMenus() {
    try {
      this.loading.set(true);
      const menus = await this.menusService.getAllMenus();
      this.menus.set(menus);
      this.filteredMenus.set(menus);
    } catch (error) {
      this.error.set('Error loading menus');
      console.error('Error loading menus:', error);
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
      this.filteredMenus.set(this.menus());
    } else {
      const filtered = this.menus().filter(
        (menu) =>
          menu.name.toLowerCase().includes(searchValue) ||
          menu.description.toLowerCase().includes(searchValue)
      );
      this.filteredMenus.set(filtered);
    }
  }

  clearSearch() {
    this.searchTerm.set('');
    this.filteredMenus.set(this.menus());
  }

  sortByPrice() {
    const sorted = [...this.filteredMenus()].sort((a, b) => a.price - b.price);
    this.filteredMenus.set(sorted);
  }

  sortByName() {
    const sorted = [...this.filteredMenus()].sort((a, b) => a.name.localeCompare(b.name));
    this.filteredMenus.set(sorted);
  }

  showFeaturedOnly() {
    const featured = this.menus().filter((menu) => menu.isFeatured);
    this.filteredMenus.set(featured);
  }

  showAll() {
    this.filteredMenus.set(this.menus());
    this.searchTerm.set('');
  }
}
