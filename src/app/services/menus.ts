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
}

export interface CreateMenuRequest {
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  isFeatured: boolean;
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
      const data = (await res.json()) as MenuResponse[];
      this.menus = data;
      return data;
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
      const data = (await res.json()) as MenuResponse;
      return data;
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
      await this.getAllMenus(); // Refresh the list
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

      // Handle 204 No Content response (successful update with no body)
      let data: MenuResponse;
      if (res.status === 204 || res.headers.get('content-length') === '0') {
        // Create a mock response for 204 No Content
        data = { id, ...menu } as MenuResponse;
      } else {
        data = (await res.json()) as MenuResponse;
      }

      await this.getAllMenus(); // Refresh the list
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
      await this.getAllMenus(); // Refresh the list
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  }
}
