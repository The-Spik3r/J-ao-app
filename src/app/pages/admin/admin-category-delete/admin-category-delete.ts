import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, Package, AlertTriangle } from 'lucide-angular';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-category-delete',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-category-delete.html',
  styleUrl: './admin-category-delete.css',
})
export class AdminCategoryDeleteComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Package = Package;
  readonly AlertTriangle = AlertTriangle;

  router = inject(Router);
  private categoriesService = inject(CategoriesService);
  private authService = inject(Auth);
  private marketStallsService = inject(MarketStallsService);

  isDeleting = false;
  isLoading = true;
  errorMessage = '';
  categories: any[] = [];
  selectedCategory: any = null;
  sellerId = 0;
  marketStallId = 0;

  async ngOnInit() {
    await this.loadSellerData();
    await this.loadCategories();
  }

  async loadSellerData() {
    try {
      const sellerData = await this.authService.me();
      this.sellerId = sellerData.id;

      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async loadCategories() {
    try {
      const categories = await this.categoriesService.getAllCategories();
      // Filter categories by marketStallId
      this.categories = categories.filter((cat) => cat.marketStallId === this.marketStallId);
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading categories. Please try again.';
      this.isLoading = false;
      console.error('Error loading categories:', error);
    }
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
  }

  async confirmDelete() {
    if (!this.selectedCategory) return;

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await this.categoriesService.deleteCategory(this.selectedCategory.id);
      this.router.navigate(['/admin/category']);
    } catch (error) {
      this.errorMessage = 'Error deleting category. Please try again.';
      this.isDeleting = false;
      console.error('Error deleting category:', error);
    }
  }

  goBack() {
    this.router.navigate(['/admin/category']);
  }
}
