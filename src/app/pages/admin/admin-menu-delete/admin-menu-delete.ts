import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, AlertTriangle, Trash2, Menu } from 'lucide-angular';
import { MenusService } from '../../../services/menus';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-menu-delete',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-menu-delete.html',
  styleUrl: './admin-menu-delete.css',
})
export class AdminMenuDeleteComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly AlertTriangle = AlertTriangle;
  readonly Trash2 = Trash2;
  readonly Menu = Menu;

  private router = inject(Router);
  private menusService = inject(MenusService);
  private categoriesService = inject(CategoriesService);
  private authService = inject(Auth);
  private marketStallsService = inject(MarketStallsService);

  menus: any[] = [];
  categories: any[] = [];
  selectedMenu: any = null;
  isLoading = true;
  isDeleting = false;
  errorMessage = '';
  sellerId = 0;
  marketStallId = 0;

  async ngOnInit() {
    await this.loadSellerData();
    await this.loadMenus();
  }

  async loadSellerData() {
    try {
      const sellerData: any = await this.authService.me();
      this.sellerId = sellerData.id;

      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;

      await this.loadCategories();
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async loadCategories() {
    try {
      const allCategories = await this.categoriesService.getAllCategories();
      this.categories = allCategories.filter((cat) => cat.marketStallId === this.marketStallId);
    } catch (error) {
      this.errorMessage = 'Error loading categories. Please try again.';
      console.error('Error loading categories:', error);
    }
  }

  async loadMenus() {
    try {
      const allMenus = await this.menusService.getAllMenus();
      const categoryIds = this.categories.map((cat) => cat.id);
      this.menus = allMenus.filter((menu) => categoryIds.includes(menu.categoryId));
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading menus. Please try again.';
      this.isLoading = false;
      console.error('Error loading menus:', error);
    }
  }

  selectMenu(menu: any) {
    this.selectedMenu = menu;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  async confirmDelete() {
    if (!this.selectedMenu) return;

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await this.menusService.deleteMenu(this.selectedMenu.id);
      this.router.navigate(['/admin/menu']);
    } catch (error) {
      this.errorMessage = 'Error deleting menu item. Please try again.';
      this.isDeleting = false;
      console.error('Error deleting menu item:', error);
    }
  }

  goBack() {
    this.router.navigate(['/admin/menu']);
  }
}
