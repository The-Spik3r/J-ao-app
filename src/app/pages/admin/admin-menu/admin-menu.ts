import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Edit, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-admin-menu',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
})
export class AdminMenuComponent {
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
}
