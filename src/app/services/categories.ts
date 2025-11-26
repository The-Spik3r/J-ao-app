import { Injectable } from '@angular/core';

interface Menu {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  categoryId: number;
  isHappyHour: boolean;
  discountPercentage: number;
}

interface MarketStall {
  id: number;
  name: string;
  description: string;
  location: string;
  views: number;
  sellerId: number;
}

interface CategoriesResponse {
  id: number;
  name: string;
  description: string;
  fotoUrl: string;
  marketStallId: number;
  marketStall: MarketStall;
  menus: Menu[];
}

interface CreateCategoryRequest {
  name: string;
  marketStallId: number;
  description: string;
  fotoUrl: string;
}

interface UpdateCategoryRequest {
  name: string;
  marketStallId: number;
  description: string;
  fotoUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl: string = 'https://localhost:7200/api/Category';
  categories: CategoriesResponse[] = [];

  async getAllCategories(): Promise<CategoriesResponse[]> {
    try {
      const response = await fetch(this.baseUrl, {
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
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      this.categories = [];
      throw error;
    }
  }

  async getCategoryById(id: number): Promise<CategoriesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
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
      throw error;
    }
  }

  async createCategory(category: CreateCategoryRequest): Promise<CategoriesResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async updateCategory(id: number, category: UpdateCategoryRequest): Promise<CategoriesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data: CategoriesResponse;
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        data = { id, ...category } as CategoriesResponse;
      } else {
        data = await response.json();
      }

      return data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}
