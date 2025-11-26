import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-stalls-items',
  imports: [],
  templateUrl: './market-stalls-items.html',
  styleUrl: './market-stalls-items.css',
})
export class MarketStallsItems {
  private router = inject(Router);

  id = input.required<number>();
  title = input.required<string>();
  location = input.required<string>();

  navigateToDetail() {
    this.router.navigate(['/market-stall', this.id()]);
  }
}
