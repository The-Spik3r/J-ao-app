import { Component } from '@angular/core';
import { LucideAngularModule, Search as SearchIcon  } from 'lucide-angular';
@Component({
  selector: 'app-search',
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  readonly SearchIcon = SearchIcon;
}
