import { Component, inject } from '@angular/core';
import { LucideAngularModule, ArrowLeft, Store, Grid, Menu } from 'lucide-angular';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, LucideAngularModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  readonly ArrowLeft = ArrowLeft;
  readonly Store = Store;
  readonly Grid = Grid;
  readonly Menu = Menu;

  private location = inject(Location);
  private router = inject(Router);

  goBack() {
    const currentUrl = this.router.url;

    if (currentUrl !== '/admin' && currentUrl.startsWith('/admin/')) {
      this.router.navigate(['/admin']);
    } else {
      this.location.back();
    }
  }
}
