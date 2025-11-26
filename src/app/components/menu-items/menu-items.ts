import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
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

  private router = inject(Router);

  id = input.required<number>();
  imagen = input.required<string>();
  nombre = input.required<string>();
  subtitulo = input.required<string>();
  precio = input.required<number>();

  agregarAlCarrito(): void {}

  verDetalle(): void {
    this.router.navigate(['/menu', this.id()]);
  }
}
