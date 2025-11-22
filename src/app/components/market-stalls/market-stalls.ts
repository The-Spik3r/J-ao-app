import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarketStalls as MarketStallsService } from '../../services/market-stalls';
import { MarketStallsItems } from '../market-stalls-items/market-stalls-items';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-stalls',
  imports: [CommonModule, RouterLink, MarketStallsItems],
  templateUrl: './market-stalls.html',
  styleUrl: './market-stalls.css',
})
export class MarketStalls implements OnInit {
  marketStallsService = inject(MarketStallsService);

  ngOnInit(): void {
    this.loadMarketStalls();
  }

  async loadMarketStalls() {
    await this.marketStallsService.getAllMarketStalls();
  }
}
