import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft,
  MapPin,
  Eye,
  User,
  Star,
  ShoppingCart,
} from 'lucide-angular';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MarketStallsService } from '../../services/market-stalls';
import { CategoriesService } from '../../services/categories';
import { MenusService } from '../../services/menus';
import { CartService } from '../../services/cart';

interface MarketStallResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  views: number;
  sellerId: number;
  seller: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    state: number;
  };
  categories: Array<{
    id: number;
    name: string;
    marketStallId: number;
    description: string;
    fotoUrl: string;
  }>;
}

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
  menus: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    categoryId: number;
  }>;
}

@Component({
  selector: 'app-market-stall-detail',
  imports: [CommonModule, LucideAngularModule, ToastModule],
  templateUrl: './market-stall-detail.html',
  styleUrl: './market-stall-detail.css',
})
export class MarketStallDetail implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly MapPin = MapPin;
  readonly Eye = Eye;
  readonly User = User;
  readonly Star = Star;
  readonly ShoppingCart = ShoppingCart;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private marketStallsService = inject(MarketStallsService);
  private categoriesService = inject(CategoriesService);
  private menusService = inject(MenusService);
  private cartService = inject(CartService);

  marketStall = signal<MarketStallResponse | null>(null);
  categories = signal<CategoriesResponse[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  selectedCategory = signal<number | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadMarketStallDetail(parseInt(id));
    }
  }

  async loadMarketStallDetail(id: number) {
    try {
      this.loading.set(true);
      this.error.set('');

      const marketStall = await this.marketStallsService.getMarketStallById(id);
      this.marketStall.set(marketStall);

      const allCategories = await this.categoriesService.getAllCategories();
      const marketStallCategories = allCategories.filter((cat) => cat.marketStallId === id);
      this.categories.set(marketStallCategories);
    } catch (error) {
      console.error('Error loading market stall detail:', error);
      this.error.set('Error al cargar los detalles del puesto');
    } finally {
      this.loading.set(false);
    }
  }

  selectCategory(categoryId: number) {
    this.selectedCategory.set(this.selectedCategory() === categoryId ? null : categoryId);
  }

  navigateToMenu(menuId: number) {
    this.router.navigate(['/menu', menuId]);
  }

  goBack() {
    this.router.navigate(['/market-stalls']);
  }

  addToCart(menu: any) {
    if (menu.stock > 0) {
      this.cartService.addToCart(menu, 1);
    }
  }
}
