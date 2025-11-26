import { Injectable, signal, computed, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'j-ao-cart';
  private messageService = inject(MessageService);

  private cartItems = signal<CartItem[]>(this.loadFromStorage());

  readonly items = computed(() => this.cartItems());
  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0)
  );
  readonly total = computed(() => this.subtotal());

  readonly isEmpty = computed(() => this.cartItems().length === 0);

  constructor() {
    this.cartItems.set(this.loadFromStorage());
  }

  /**
   * Agregar un producto al carrito
   */
  addToCart(menu: any, quantity: number = 1): boolean {
    if (quantity <= 0 || quantity > menu.stock) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid quantity',
        life: 3000,
      });
      return false;
    }

    // Calculate the actual price (with discount if applicable)
    let actualPrice = menu.price;
    if (menu.isHappyHour && menu.discountPercentage > 0) {
      actualPrice = menu.price * (1 - menu.discountPercentage / 100);
    }

    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex((item) => item.id === menu.id);

    if (existingItemIndex >= 0) {
      const existingItem = currentItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > menu.stock) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Stock Limit',
          detail: `Cannot add more. Only ${menu.stock} available in stock`,
          life: 3000,
        });
        return false;
      }
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      };

      this.cartItems.set(updatedItems);
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Cart',
        detail: `${menu.name} quantity updated to ${newQuantity}`,
        life: 3000,
      });
    } else {
      const newItem: CartItem = {
        id: menu.id,
        name: menu.name,
        price: actualPrice,
        quantity: quantity,
        imageUrl: menu.imageUrl,
        stock: menu.stock,
      };

      this.cartItems.set([...currentItems, newItem]);
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Cart',
        detail: `${menu.name} has been added to your cart`,
        life: 3000,
      });
    }

    this.saveToStorage();
    return true;
  }

  /**
   * Remover un producto del carrito completamente
   */
  removeFromCart(itemId: string): void {
    const updatedItems = this.cartItems().filter((item) => item.id !== itemId);
    this.cartItems.set(updatedItems);
    this.saveToStorage();
  }

  /**
   * Actualizar la cantidad de un producto específico
   */
  updateQuantity(itemId: string, quantity: number): boolean {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return true;
    }

    const currentItems = this.cartItems();
    const itemIndex = currentItems.findIndex((item) => item.id === itemId);

    if (itemIndex >= 0) {
      const item = currentItems[itemIndex];

      if (quantity > item.stock) {
        return false;
      }

      const updatedItems = [...currentItems];
      updatedItems[itemIndex] = {
        ...item,
        quantity: quantity,
      };

      this.cartItems.set(updatedItems);
      this.saveToStorage();
      return true;
    }

    return false;
  }

  /**
   * Incrementar la cantidad de un producto
   */
  increaseQuantity(itemId: string): boolean {
    const item = this.cartItems().find((item) => item.id === itemId);
    if (item) {
      return this.updateQuantity(itemId, item.quantity + 1);
    }
    return false;
  }

  /**
   * Decrementar la cantidad de un producto
   */
  decreaseQuantity(itemId: string): boolean {
    const item = this.cartItems().find((item) => item.id === itemId);
    if (item) {
      return this.updateQuantity(itemId, item.quantity - 1);
    }
    return false;
  }

  /**
   * Limpiar todo el carrito
   */
  clearCart(): void {
    this.cartItems.set([]);
    this.saveToStorage();
  }

  /**
   * Obtener un resumen completo del carrito
   */
  getCartSummary(): CartSummary {
    return {
      items: this.items(),
      totalItems: this.totalItems(),
      subtotal: this.subtotal(),
      total: this.total(),
    };
  }

  /**
   * Verificar si un producto está en el carrito
   */
  isInCart(itemId: string): boolean {
    return this.cartItems().some((item) => item.id === itemId);
  }

  /**
   * Obtener la cantidad de un producto específico en el carrito
   */
  getItemQuantity(itemId: string): number {
    const item = this.cartItems().find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  }

  /**
   * Cargar el carrito desde localStorage
   */
  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  /**
   * Guardar el carrito en localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems()));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }
}
