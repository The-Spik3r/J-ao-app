import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-category-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-category-edit.html',
  styleUrl: './admin-category-edit.css',
})
export class AdminCategoryEditComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  private authService = inject(Auth);
  private marketStallsService = inject(MarketStallsService);

  categoryForm: FormGroup;
  isSubmitting = false;
  isLoading = true;
  errorMessage = '';
  sellerId = 0;
  marketStallId = 0;
  categoryId = 0;
  categories: any[] = [];

  constructor() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      fotoUrl: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    await this.loadSellerData();
    await this.loadCategories();
  }

  async loadSellerData() {
    try {
      const sellerData = await this.authService.me();
      this.sellerId = sellerData.id;

      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async loadCategories() {
    try {
      const categories = await this.categoriesService.getAllCategories();
      // Filter categories by marketStallId
      this.categories = categories.filter((cat) => cat.marketStallId === this.marketStallId);

      // If there are categories, select the first one for editing
      if (this.categories.length > 0) {
        const firstCategory = this.categories[0];
        this.categoryId = firstCategory.id;
        this.categoryForm.patchValue({
          name: firstCategory.name,
          description: firstCategory.description,
          fotoUrl: firstCategory.fotoUrl,
        });
      }
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading categories. Please try again.';
      this.isLoading = false;
      console.error('Error loading categories:', error);
    }
  }

  onCategorySelect(category: any) {
    this.categoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      fotoUrl: category.fotoUrl,
    });
  }

  async onSubmit() {
    if (this.categoryForm.valid && this.marketStallId && this.categoryId) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.categoryForm.value,
        marketStallId: this.marketStallId,
      };

      try {
        await this.categoriesService.updateCategory(this.categoryId, formData);
        this.router.navigate(['/admin/category']);
      } catch (error) {
        this.errorMessage = 'Error updating category. Please try again.';
        this.isSubmitting = false;
        console.error('Error updating category:', error);
      }
    }
  }

  goToCreate() {
    this.router.navigate(['/admin/category/create']);
  }

  goBack() {
    this.router.navigate(['/admin/category']);
  }
}
