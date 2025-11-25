import { Injectable, signal, computed } from '@angular/core';

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

  // Signal para almacenar los items del carrito
  private cartItems = signal<CartItem[]>(this.loadFromStorage());

  // Computed signals para cálculos automáticos
  readonly items = computed(() => this.cartItems());
  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  readonly subtotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0)
  );
  readonly total = computed(() => this.subtotal()); // Por ahora igual al subtotal, después se pueden agregar impuestos

  readonly isEmpty = computed(() => this.cartItems().length === 0);

  constructor() {
    // Observar cambios en el carrito y guardar en localStorage
    this.cartItems.set(this.loadFromStorage());
  }

  /**
   * Agregar un producto al carrito
   */
  addToCart(menu: any, quantity: number = 1): boolean {
    if (quantity <= 0 || quantity > menu.stock) {
      return false;
    }

    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex((item) => item.id === menu.id);

    if (existingItemIndex >= 0) {
      // Si el item ya existe, actualizar la cantidad
      const existingItem = currentItems[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > menu.stock) {
        return false; // No se puede agregar más de lo disponible en stock
      }

      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      };

      this.cartItems.set(updatedItems);
    } else {
      // Si es un nuevo item, agregarlo al carrito
      const newItem: CartItem = {
        id: menu.id,
        name: menu.name,
        price: menu.price,
        quantity: quantity,
        imageUrl: menu.imageUrl,
        stock: menu.stock,
      };

      this.cartItems.set([...currentItems, newItem]);
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
        return false; // No se puede poner más cantidad que el stock disponible
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
