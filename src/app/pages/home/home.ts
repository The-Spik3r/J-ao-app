import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Search } from '../../components/search/search';
import { Categories } from '../../components/categories/categories';
import { MarketStalls } from '../../components/market-stalls/market-stalls';
import { MenuItems } from '../../components/menu-items/menu-items';
import { Menus } from '../../components/menus/menus';
import { BNav } from '../../components/bnav/bnav';

@Component({
  selector: 'app-home',
  imports: [Nav, Search, Categories, MarketStalls, MenuItems, Menus, BNav],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
