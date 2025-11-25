import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Search, Grid, List } from 'lucide-angular';
import { MarketStallsService } from '../../services/market-stalls';
import { MarketStallsItems } from '../../components/market-stalls-items/market-stalls-items';

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
  categories: Array<{
    id: number;
    name: string;
    marketStallId: number;
    description: string;
    fotoUrl: string;
  }>;
}

@Component({
  selector: 'app-all-market-stalls',
  imports: [CommonModule, LucideAngularModule, MarketStallsItems],
  templateUrl: './all-market-stalls.html',
  styleUrl: './all-market-stalls.css',
})
export class AllMarketStalls implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Search = Search;
  readonly Grid = Grid;
  readonly List = List;

  private router = inject(Router);
  private marketStallsService = inject(MarketStallsService);

  marketStalls = signal<MarketStallResponse[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  searchTerm = signal<string>('');
  filteredMarketStalls = signal<MarketStallResponse[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');

  ngOnInit() {
    this.loadAllMarketStalls();
  }

  private async loadAllMarketStalls() {
    this.loading.set(true);
    try {
      const stalls = await this.marketStallsService.getAllMarketStalls();
      this.marketStalls.set(stalls);
      this.filteredMarketStalls.set(stalls);
    } catch (error) {
      this.error.set('Error loading market stalls');
      console.error('Error loading market stalls:', error);
    } finally {
      this.loading.set(false);
    }
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const term = target.value.toLowerCase();
    this.searchTerm.set(term);

    if (!term) {
      this.filteredMarketStalls.set(this.marketStalls());
      return;
    }

    const filtered = this.marketStalls().filter(
      (stall) =>
        stall.name.toLowerCase().includes(term) ||
        stall.description.toLowerCase().includes(term) ||
        stall.location.toLowerCase().includes(term) ||
        stall.seller.firstName.toLowerCase().includes(term) ||
        stall.seller.lastName.toLowerCase().includes(term)
    );
    this.filteredMarketStalls.set(filtered);
  }

  clearSearch() {
    this.searchTerm.set('');
    this.filteredMarketStalls.set(this.marketStalls());
  }

  showAll() {
    this.filteredMarketStalls.set(this.marketStalls());
  }

  sortByName() {
    const sorted = [...this.filteredMarketStalls()].sort((a, b) => a.name.localeCompare(b.name));
    this.filteredMarketStalls.set(sorted);
  }

  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
