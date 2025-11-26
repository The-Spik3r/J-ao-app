import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Star, ShoppingCart, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-menu-items',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './menu-items.html',
  styleUrl: './menu-items.css',
})
export class MenuItems {
  readonly Heart = Heart;
  readonly Star = Star;
  readonly ShoppingCart = ShoppingCart;
  readonly ArrowRight = ArrowRight;

  private router = inject(Router);

  id = input.required<number>();
  imagen = input.required<string>();
  nombre = input.required<string>();
  subtitulo = input.required<string>();
  precio = input.required<number>();
  isHappyHour = input<boolean>(false);
  discountPercentage = input<number>(0);

  getDiscountedPrice(): number {
    if (this.isHappyHour() && this.discountPercentage() > 0) {
      return this.precio() * (1 - this.discountPercentage() / 100);
    }
    return this.precio();
  }

  agregarAlCarrito(): void {}

  verDetalle(): void {
    this.router.navigate(['/menu', this.id()]);
  }
}
