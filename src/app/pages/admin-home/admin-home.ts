import { Component } from '@angular/core';
import { LucideAngularModule, ArrowLeft, Store, Grid, Menu } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {
  readonly ArrowLeft = ArrowLeft;
  readonly Store = Store;
  readonly Grid = Grid;
  readonly Menu = Menu;
}
