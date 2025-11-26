import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft,
  Store,
  ShoppingCart,
  Star,
  Sparkles,
} from 'lucide-angular';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CategoriesService } from '../../services/categories';
import { CartService } from '../../services/cart';

interface CategoryResponse {
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
  menus: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    categoryId: number;
    isHappyHour: boolean;
    discountPercentage: number;
  }>;
}

@Component({
  selector: 'app-category-detail',
  imports: [CommonModule, LucideAngularModule, ToastModule],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.css',
})
export class CategoryDetail implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Store = Store;
  readonly ShoppingCart = ShoppingCart;
  readonly Star = Star;
  readonly Sparkles = Sparkles;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);
  private cartService = inject(CartService);

  category = signal<CategoryResponse | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadCategoryDetail(parseInt(id));
    }
  }

  async loadCategoryDetail(id: number) {
    try {
      this.loading.set(true);
      this.error.set('');

      const categoryData = await this.categoriesService.getCategoryById(id);
      this.category.set(categoryData);
    } catch (err) {
      console.error('Error loading category details:', err);
      this.error.set('Failed to load category details. Please try again later.');
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/categories']);
  }

  navigateToMenu(menuId: number) {
    this.router.navigate(['/menu', menuId]);
  }

  navigateToMarketStall(stallId: number) {
    this.router.navigate(['/market-stall', stallId]);
  }

  addToCart(menu: any) {
    if (menu.stock > 0) {
      this.cartService.addToCart(menu, 1);
    }
  }
}
