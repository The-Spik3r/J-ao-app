import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { MarketStallsService } from '../../../services/market-stalls';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-admin-market-stall-create',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-market-stall-create.html',
  styleUrl: './admin-market-stall-create.css',
})
export class AdminMarketStallCreateComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private marketStallsService = inject(MarketStallsService);
  private authService = inject(Auth);

  readonly ArrowLeft = ArrowLeft;

  marketStallForm: FormGroup;
  isSubmitting = false;
  isLoading = true;
  errorMessage = '';
  sellerId = 0;

  constructor() {
    this.marketStallForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    await this.loadSellerData();
  }

  async loadSellerData() {
    try {
      const sellerData = await this.authService.me();
      this.sellerId = sellerData.id;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async onSubmit() {
    if (this.marketStallForm.valid && this.sellerId) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.marketStallForm.value,
        sellerId: this.sellerId,
      };

      try {
        await this.marketStallsService.createMarketStall(formData);
        this.router.navigate(['/admin/marketStall']);
      } catch (error) {
        this.errorMessage = 'Error creating market stall. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating market stall:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/admin/marketStall']);
  }
}
