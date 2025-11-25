import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarketStallsService } from '../../services/market-stalls';
import { MarketStallsItems } from '../market-stalls-items/market-stalls-items';
import { CommonModule } from '@angular/common';

interface MarketStallResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  views: number;
  sellerId: number;
  seller: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    state: number;
  };
  categories: {
    id: number;
    name: string;
    marketStallId: number;
    description: string;
    fotoUrl: string;
  }[];
}

@Component({
  selector: 'app-market-stalls',
  imports: [CommonModule, RouterLink, MarketStallsItems],
  templateUrl: './market-stalls.html',
  styleUrl: './market-stalls.css',
})
export class MarketStalls implements OnInit {
  private marketStallsService = inject(MarketStallsService);
  marketStalls = signal<MarketStallResponse[]>([]);

  ngOnInit(): void {
    this.loadMarketStalls();
  }

  async loadMarketStalls() {
    try {
      const stalls = await this.marketStallsService.getAllMarketStalls();
      this.marketStalls.set(stalls);
    } catch (error) {
      console.error('Error loading market stalls:', error);
      this.marketStalls.set([]);
    }
  }
}
