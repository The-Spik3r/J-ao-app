import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus, Edit, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-admin-market-stall',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './admin-market-stall.html',
  styleUrl: './admin-market-stall.css',
})
export class AdminMarketStall {
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
}
