import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MapPin, BellDot, Search, ShoppingCart } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-nav',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  readonly MapPin = MapPin;
  readonly BellDot = BellDot;
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;

  authService = inject(Auth);
  private cartService = inject(CartService);

  get totalItems() {
    return this.cartService.totalItems();
  }

  get hasItems() {
    return this.totalItems > 0;
  }

  ngOnInit() {
    this.authService.me();
  }
}
