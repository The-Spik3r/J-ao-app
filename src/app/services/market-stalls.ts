import { Injectable } from '@angular/core';

interface Seller {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  state: number;
}

interface Category {
  id: number;
  name: string;
  marketStallId: number;
  description: string;
  fotoUrl: string;
}

interface MarketStallResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  views: number;
  sellerId: number;
  seller: Seller;
  categories: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketStalls {
  private baseUrl: string = 'https://localhost:7200/api/';
  marketStalls: MarketStallResponse[] = [];

  async getAllMarketStalls() {
    try {
      const response = await fetch(this.baseUrl + 'MarketStall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.marketStalls = data;
    } catch (error) {
      console.error('Error fetching market stalls:', error);
      this.marketStalls = [];
    }
  }

  async getMarketStallById(id: number): Promise<MarketStallResponse | null> {
    try {
      const response = await fetch(this.baseUrl + `MarketStall/${id}`, {
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
      console.error('Error fetching market stall by id:', error);
      return null;
    }
  }
}
