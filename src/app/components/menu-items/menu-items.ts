import { Component, input } from '@angular/core';
import { LucideAngularModule, Heart, Star, ShoppingCart, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-menu-items',
  imports: [LucideAngularModule],
  templateUrl: './menu-items.html',
  styleUrl: './menu-items.css',
})
export class MenuItems {
  readonly Heart = Heart;
  readonly Star = Star;
  readonly ShoppingCart = ShoppingCart;
  readonly ArrowRight = ArrowRight;
  imagen = input.required<string>();
  nombre = input.required<string>();
  subtitulo = input.required<string>();
  precio = input.required<number>();

  agregarAlCarrito(): void {
    // TODO: Implement add to cart logic
  }
}
