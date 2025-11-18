import { Injectable } from '@angular/core';

interface menuResponse {
  id: number;
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
export class Menus {
  private baseUrl: string = 'https://localhost:7200/api/';
  menusItems: menuResponse[] = [];
  async getAllMenus() {
    try {
      const res = await fetch(this.baseUrl + 'Menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = (await res.json()) as menuResponse[];
      this.menusItems = data;
    } catch (error) {
      this.menusItems = [];
      console.error('Error fetching menus:', error);
    }
  }

  async getMenuById(id: number): Promise<menuResponse | null> {
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
      const data = (await res.json()) as menuResponse;
      return data;
    } catch (error) {
      console.error('Error fetching menu by id:', error);
      return null;
    }
  }
}
