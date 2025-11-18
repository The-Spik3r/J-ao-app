import { Injectable } from '@angular/core';

interface registerSeller {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state: number;
}
interface registerSellerResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  state: number;
}

interface marketStallData {
  name: string;
  description: string;
  location: string;
  sellerId: number;
}

interface marketStallResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  sellerId: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  token: string | null = localStorage.getItem('token');
  private baseUrl: string = 'https://localhost:7200/api/';

  async logIn(email: string, password: string) {
    try {
      const res = await fetch(this.baseUrl + 'authentication/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      console.log(res);

      this.token = await res.text();
      localStorage.setItem('token', this.token || '');
      return {
        success: res.ok,
        message: 'success',
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async registerSeller(sellerData: registerSeller) {
    try {
      const res = await fetch(this.baseUrl + 'Seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });
      return {
        success: res.ok,
        data: (await res.json()) as registerSellerResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  async createMarketStall(marketStallData: marketStallData) {
    try {
      const res = await fetch(this.baseUrl + 'MarketStall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marketStallData),
      });
      return {
        success: res.ok,
        data: (await res.json()) as marketStallResponse,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
