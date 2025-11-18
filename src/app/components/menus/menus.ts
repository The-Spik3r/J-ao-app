import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItems } from '../menu-items/menu-items';
import { Menus as menuService } from '../../services/menus';
@Component({
  selector: 'app-menus',
  imports: [MenuItems, RouterLink],
  templateUrl: './menus.html',
  styleUrl: './menus.css',
})
export class Menus implements OnInit {
  ngOnInit(): void {
    this.loadMenus();
  }
  MenuService = inject(menuService);

  async loadMenus() {
    await this.MenuService.getAllMenus();
  }
}
