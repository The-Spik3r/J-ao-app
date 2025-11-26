import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, ShoppingCart, Star, Heart, Sparkles } from 'lucide-angular';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenusService } from '../../services/menus';
import { CartService } from '../../services/cart';

interface MenuDetailData {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  isFeatured: boolean;
  isHappyHour: boolean;
  discountPercentage: number;
}

@Component({
  selector: 'app-menu-detail',
  imports: [CommonModule, LucideAngularModule, ToastModule],
  templateUrl: './menu-detail.html',
  styleUrl: './menu-detail.css',
})
export class MenuDetail implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly ShoppingCart = ShoppingCart;
  readonly Star = Star;
  readonly Heart = Heart;
  readonly Sparkles = Sparkles;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private menuService = inject(MenusService);
  private cartService = inject(CartService);

  menu = signal<MenuDetailData | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');
  quantity = signal<number>(1);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadMenuDetail(parseInt(id, 10));
    } else {
      this.error.set('Invalid menu ID');
      this.loading.set(false);
    }
  }

  private async loadMenuDetail(id: number) {
    try {
      this.loading.set(true);
      const menuDetail = await this.menuService.getMenuById(id);
      if (menuDetail) {
        this.menu.set(menuDetail);
      } else {
        this.error.set('Menu not found');
      }
    } catch (err) {
      this.error.set('Error loading menu');
      console.error('Error loading menu detail:', err);
    } finally {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  increaseQuantity() {
    const currentQuantity = this.quantity();
    const maxStock = this.menu()?.stock || 0;
    if (currentQuantity < maxStock) {
      this.quantity.set(currentQuantity + 1);
    }
  }

  decreaseQuantity() {
    const currentQuantity = this.quantity();
    if (currentQuantity > 1) {
      this.quantity.set(currentQuantity - 1);
    }
  }

  addToCart() {
    const menuItem = this.menu();
    const qty = this.quantity();
    if (menuItem && qty > 0) {
      const success = this.cartService.addToCart(menuItem, qty);
      if (!success) {
      }
    }
  }

  getDiscountedPrice(): number {
    const menuItem = this.menu();
    if (menuItem && menuItem.isHappyHour && menuItem.discountPercentage > 0) {
      return menuItem.price * (1 - menuItem.discountPercentage / 100);
    }
    return menuItem?.price || 0;
  }

  getTotalPrice(): number {
    return this.getDiscountedPrice() * this.quantity();
  }

  toggleFavorite() {}
}
