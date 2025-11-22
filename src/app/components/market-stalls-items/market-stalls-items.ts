import { Component, input } from '@angular/core';

@Component({
  selector: 'app-market-stalls-items',
  imports: [],
  templateUrl: './market-stalls-items.html',
  styleUrl: './market-stalls-items.css',
})
export class MarketStallsItems {
  title = input.required<string>();
  location = input.required<string>();
}
