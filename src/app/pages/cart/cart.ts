import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-angular';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly ArrowLeft = ArrowLeft;
  readonly Trash2 = Trash2;
  readonly Plus = Plus;
  readonly Minus = Minus;
  readonly ShoppingBag = ShoppingBag;

  constructor(public cartService: CartService, private router: Router) {}

  get cartItems() {
    return this.cartService.items();
  }

  get isEmpty() {
    return this.cartService.isEmpty();
  }

  get subtotal() {
    return this.cartService.subtotal();
  }

  get total() {
    return this.cartService.total();
  }

  get totalItems() {
    return this.cartService.totalItems();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  increaseQuantity(itemId: string) {
    this.cartService.increaseQuantity(itemId);
  }

  decreaseQuantity(itemId: string) {
    this.cartService.decreaseQuantity(itemId);
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  proceedToCheckout() {
    // TODO: Implementar lógica de checkout
    console.log('Proceeding to checkout...');
  }
}
