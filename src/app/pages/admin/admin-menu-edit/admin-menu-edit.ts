import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, Sparkles } from 'lucide-angular';
import { MenusService } from '../../../services/menus';
import { CategoriesService } from '../../../services/categories';
import { Auth } from '../../../services/auth';
import { MarketStallsService } from '../../../services/market-stalls';

@Component({
  selector: 'app-admin-menu-edit',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './admin-menu-edit.html',
  styleUrl: './admin-menu-edit.css',
})
export class AdminMenuEditComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Sparkles = Sparkles;

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
    isHappyHour: [false],
    discountPercentage: [0],
  });

  menus: any[] = [];
  categories: any[] = [];
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  sellerId = 0;
  marketStallId = 0;
  selectedMenuId = 0;

  async ngOnInit() {
    await this.loadSellerData();
    await this.loadMenus();
    this.setupHappyHourValidation();
  }

  setupHappyHourValidation() {
    this.menuForm.get('isHappyHour')?.valueChanges.subscribe((isHappyHour) => {
      const discountControl = this.menuForm.get('discountPercentage');
      if (isHappyHour) {
        discountControl?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]);
      } else {
        discountControl?.clearValidators();
        discountControl?.setValue(0);
      }
      discountControl?.updateValueAndValidity();
    });
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
    } catch (error) {
      this.errorMessage = 'Error loading categories. Please try again.';
      console.error('Error loading categories:', error);
    }
  }

  async loadMenus() {
    try {
      const allMenus = await this.menusService.getAllMenus();
      const categoryIds = this.categories.map((cat) => cat.id);
      this.menus = allMenus.filter((menu) => categoryIds.includes(menu.categoryId));

      if (this.menus.length > 0) {
        this.selectMenu(this.menus[0]);
      }
      this.isLoading = false;
    } catch (error) {
      this.errorMessage = 'Error loading menus. Please try again.';
      this.isLoading = false;
      console.error('Error loading menus:', error);
    }
  }

  selectMenu(menu: any) {
    this.selectedMenuId = menu.id;
    this.menuForm.patchValue({
      name: menu.name,
      price: menu.price,
      stock: menu.stock,
      description: menu.description,
      imageUrl: menu.imageUrl,
      categoryId: menu.categoryId,
      isFeatured: menu.isFeatured,
      isHappyHour: menu.isHappyHour || false,
      discountPercentage: menu.discountPercentage || 0,
    });
  }

  async onSubmit() {
    if (this.menuForm.valid && this.selectedMenuId) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = {
        ...this.menuForm.value,
      };

      try {
        await this.menusService.updateMenu(this.selectedMenuId, formData);
        this.router.navigate(['/admin/menu']);
      } catch (error) {
        this.errorMessage = 'Error updating menu item. Please try again.';
        this.isSubmitting = false;
        console.error('Error updating menu item:', error);
      }
    }
  }

  goToCreate() {
    this.router.navigate(['/admin/menu/create']);
  }

  goBack() {
    this.router.navigate(['/admin/menu']);
  }
}
