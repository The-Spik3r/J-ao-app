import { Component } from '@angular/core';
import { LucideAngularModule, Home, Search, ShoppingCart, User } from 'lucide-angular';

@Component({
  selector: 'app-bnav',
  imports: [LucideAngularModule],
  templateUrl: './bnav.html',
  styleUrl: './bnav.css',
})
export class BNav {
  readonly Home = Home;
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;
  readonly User = User;

  activeTab = 'home';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
