import { Injectable } from '@angular/core';

interface CategoriesResponse {
  id: number;
  name: string;
  description: string;
  fotoUrl: string;
  marketStallId: number;
}
@Injectable({
  providedIn: 'root',
})
export class Categories {
  private baseUrl: string = 'https://localhost:7200/api/';
  categories: CategoriesResponse[] = [];

  async getAllCategories() {
    try {
      const response = await fetch(this.baseUrl + 'Category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.categories = data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      this.categories = [];
    }
  }

  async getCategoryById(id: number): Promise<CategoriesResponse | null> {
    try {
      const response = await fetch(this.baseUrl + `Category/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category by id:', error);
      return null;
    }
  }
}
