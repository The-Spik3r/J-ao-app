import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { MenusService } from '../../../services/menus';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-menu-create',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-menu-create.html',
  styleUrl: './admin-menu-create.css',
})
export class AdminMenuCreateComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private menusService = inject(MenusService);
  private categoriesService = inject(CategoriesService);
  private authService = inject(Auth);
  private marketStallsService = inject(MarketStallsService);

  menuForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    imageUrl: ['', [Validators.required]],
    categoryId: [0, [Validators.required]],
    isFeatured: [false],
  });

  categories: any[] = [];
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  sellerId = 0;
  marketStallId = 0;

  async ngOnInit() {
    await this.loadSellerData();
  }

  async loadSellerData() {
    try {
      const sellerData: any = await this.authService.me();
      this.sellerId = sellerData.id;

      const marketStall = await this.marketStallsService.getMarketStallBySeller(this.sellerId);
      this.marketStallId = marketStall.id;

      await this.loadCategories();
    } catch (error) {
      this.errorMessage = 'Error loading seller data. Please try again.';
      this.isLoading = false;
      console.error('Error loading seller data:', error);
    }
  }

  async loadCategories() {
    try {
      const allCategories = await this.categoriesService.getAllCategories();
      this.categories = allCategories.filter((cat) => cat.marketStallId === this.marketStallId);
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading categories. Please try again.';
      this.isLoading = false;
      console.error('Error loading categories:', error);
    }
  }

  async onSubmit() {
    if (this.menuForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.menuForm.value,
      };

      try {
        await this.menusService.createMenu(formData);
        this.router.navigate(['/admin/menu']);
      } catch (error) {
        this.errorMessage = 'Error creating menu item. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating menu item:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/admin/menu']);
  }
}
