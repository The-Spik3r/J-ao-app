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

interface CreateMarketStallRequest {
  name: string;
  description: string;
  location: string;
  sellerId: number;
}

interface UpdateMarketStallRequest {
  name: string;
  description: string;
  location: string;
  sellerId: number;
}

@Injectable({
  providedIn: 'root',
})
export class MarketStallsService {
  private baseUrl: string = 'https://localhost:7200/api/MarketStall';
  marketStalls: MarketStallResponse[] = [];

  async getAllMarketStalls(): Promise<MarketStallResponse[]> {
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
      this.marketStalls = data;
      return data;
    } catch (error) {
      console.error('Error fetching market stalls:', error);
      this.marketStalls = [];
      throw error;
    }
  }

  async getMarketStallById(id: number): Promise<MarketStallResponse> {
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
      console.error('Error fetching market stall by id:', error);
      throw error;
    }
  }

  async getMarketStallBySeller(sellerId: number): Promise<MarketStallResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/seller/${sellerId}`, {
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
      console.error('Error fetching market stall by seller:', error);
      throw error;
    }
  }

  async createMarketStall(marketStall: CreateMarketStallRequest): Promise<MarketStallResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketStall),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating market stall:', error);
      throw error;
    }
  }

  async updateMarketStall(
    id: number,
    marketStall: UpdateMarketStallRequest
  ): Promise<MarketStallResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketStall),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data: MarketStallResponse;
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        data = { id, ...marketStall } as MarketStallResponse;
      } else {
        data = await response.json();
      }

      return data;
    } catch (error) {
      console.error('Error updating market stall:', error);
      throw error;
    }
  }

  async deleteMarketStall(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting market stall:', error);
      throw error;
    }
  }
}
