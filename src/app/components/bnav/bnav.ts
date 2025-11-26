import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Home, Search, ShoppingCart, User } from 'lucide-angular';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-bnav',
  imports: [LucideAngularModule],
  templateUrl: './bnav.html',
  styleUrl: './bnav.css',
})
export class BNav {
  readonly Home = Home;
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;
  readonly User = User;

  private cartService = inject(CartService);
  private router = inject(Router);

  activeTab = 'home';

  get totalItems() {
    return this.cartService.totalItems();
  }

  get hasItems() {
    return this.totalItems > 0;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    switch (tab) {
      case 'home':
        this.router.navigate(['/']);
        break;
      case 'search':
        this.router.navigate(['/search']);
        break;
      case 'cart':
        this.router.navigate(['/cart']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }
}
