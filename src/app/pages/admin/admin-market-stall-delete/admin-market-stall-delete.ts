import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowLeft, AlertTriangle } from 'lucide-angular';
import { MarketStallsService } from '../../../services/market-stalls';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-admin-market-stall-delete',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './admin-market-stall-delete.html',
  styleUrl: './admin-market-stall-delete.css',
})
export class AdminMarketStallDeleteComponent implements OnInit {
  private router = inject(Router);

  readonly ArrowLeft = ArrowLeft;
  readonly AlertTriangle = AlertTriangle;
  private marketStallsService = inject(MarketStallsService);
  private authService = inject(Auth);

  isDeleting = false;
  isLoading = true;
  errorMessage = '';
  marketStall: any = null;
  sellerId = 0;

  async ngOnInit() {
    await this.loadSellerData();
    this.loadMarketStall();
  }

  async loadSellerData() {
    try {
      const sellerData = await this.authService.me();
      this.sellerId = sellerData.id;
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async loadMarketStall() {
    if (!this.sellerId) return;

    try {
      this.marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading market stall data. Please try again.';
      this.isLoading = false;
      console.error('Error loading market stall:', error);
    }
  }

  async confirmDelete() {
    if (!this.marketStall) return;

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await this.marketStallsService.deleteMarketStall(this.marketStall.id);
      this.router.navigate(['/admin/marketStall']);
    } catch (error) {
      this.errorMessage = 'Error deleting market stall. Please try again.';
      this.isDeleting = false;
      console.error('Error deleting market stall:', error);
    }
  }

  goBack() {
    this.router.navigate(['/admin/marketStall']);
  }
}
