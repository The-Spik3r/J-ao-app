import { Injectable } from '@angular/core';

export interface MenuResponse {
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

export interface CreateMenuRequest {
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

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private baseUrl: string = 'https://localhost:7200/api/';
  menus: MenuResponse[] = [];
  async getAllMenus(): Promise<MenuResponse[]> {
    try {
      const res = await fetch(this.baseUrl + 'Menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = (await res.json()) as any[];
      // Agregar valores por defecto si no vienen de la API
      this.menus = data.map(menu => ({
        ...menu,
        isHappyHour: menu.isHappyHour ?? false,
        discountPercentage: menu.discountPercentage ?? 0,
      })) as MenuResponse[];
      return this.menus;
    } catch (error) {
      this.menus = [];
      console.error('Error fetching menus:', error);
      throw error;
    }
  }

  async getMenuById(id: number): Promise<MenuResponse | null> {
    try {
      const res = await fetch(this.baseUrl + `Menu/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = (await res.json()) as any;
      // Agregar valores por defecto si no vienen de la API
      // TEMPORAL: Si el menú es featured, activar happy hour para testing
      const menu = {
        ...data,
        isHappyHour: data.isHappyHour ?? (data.isFeatured ? true : false),
        discountPercentage: data.discountPercentage ?? (data.isFeatured ? 20 : 0),
      } as MenuResponse;
      console.log('Menu data from API:', data);
      console.log('Menu data processed:', menu);
      return menu;
    } catch (error) {
      console.error('Error fetching menu by id:', error);
      return null;
    }
  }

  async createMenu(menu: CreateMenuRequest): Promise<MenuResponse> {
    try {
      const res = await fetch(this.baseUrl + 'Menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = (await res.json()) as MenuResponse;
      await this.getAllMenus();
      return data;
    } catch (error) {
      console.error('Error creating menu:', error);
      throw error;
    }
  }

  async updateMenu(id: number, menu: CreateMenuRequest): Promise<MenuResponse> {
    try {
      const res = await fetch(this.baseUrl + `Menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      let data: MenuResponse;
      if (res.status === 204 || res.headers.get('content-length') === '0') {
        data = { id, ...menu } as MenuResponse;
      } else {
        data = (await res.json()) as MenuResponse;
      }

      await this.getAllMenus();
      return data;
    } catch (error) {
      console.error('Error updating menu:', error);
      throw error;
    }
  }

  async deleteMenu(id: number): Promise<void> {
    try {
      const res = await fetch(this.baseUrl + `Menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      await this.getAllMenus();
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  }
}
