import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-category-create',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-category-create.html',
  styleUrl: './admin-category-create.css',
})
export class AdminCategoryCreateComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  private authService = inject(Auth);
  private marketStallsService = inject(MarketStallsService);

  readonly ArrowLeft = ArrowLeft;

  categoryForm: FormGroup;
  isSubmitting = false;
  isLoading = true;
  errorMessage = '';
  sellerId = 0;
  marketStallId = 0;

  constructor() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      fotoUrl: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    await this.loadSellerData();
  }

  async loadSellerData() {
    try {
      const sellerData = await this.authService.me();
      this.sellerId = sellerData.id;

      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async onSubmit() {
    if (this.categoryForm.valid && this.marketStallId) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.categoryForm.value,
        marketStallId: this.marketStallId,
      };

      try {
        await this.categoriesService.createCategory(formData);
        this.router.navigate(['/admin/category']);
      } catch (error) {
        this.errorMessage = 'Error creating category. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating category:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/admin/category']);
  }
}
