import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { MarketStallsService } from '../../../services/market-stalls';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-admin-market-stall-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-market-stall-edit.html',
  styleUrl: './admin-market-stall-edit.css',
})
export class AdminMarketStallEditComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private marketStallsService = inject(MarketStallsService);

  readonly ArrowLeft = ArrowLeft;
  private authService = inject(Auth);

  marketStallForm: FormGroup;
  isSubmitting = false;
  isLoading = true;
  errorMessage = '';
  marketStallId = 0;
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
      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;
      this.marketStallForm.patchValue({
        name: marketStall.name,
        description: marketStall.description,
        location: marketStall.location,
      });
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading market stall data. Please try again.';
      this.isLoading = false;
      console.error('Error loading market stall:', error);
    }
  }

  async onSubmit() {
    if (this.marketStallForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.marketStallForm.value,
        sellerId: this.sellerId,
      };

      try {
        await this.marketStallsService.updateMarketStall(this.marketStallId, formData);
        this.router.navigate(['/admin/marketStall']);
      } catch (error) {
        this.errorMessage = 'Error updating market stall. Please try again.';
        this.isSubmitting = false;
        console.error('Error updating market stall:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/admin/marketStall']);
  }
}
