import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, EyeOff, Utensils } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  imports: [CommonModule, LucideAngularModule, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Utensils = Utensils;
  authService = inject(Auth);
  router = inject(Router);
  messageService = inject(MessageService);
  currentStep: number = 1;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  stallName: string = '';
  stallDescription: string = '';
  stallLocation: string = '';

  sellerId: number | null = null;
  isRegistering: boolean = false;

  failedRegister: boolean = false;
  errorMessage: string = '';
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async nextStep() {
    this.failedRegister = false;
    this.errorMessage = '';

    if (this.currentStep === 1) {
      // Validar paso 1: datos personales
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.failedRegister = true;
        this.errorMessage = 'Please fill in all fields.';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.failedRegister = true;
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      // Registrar el seller
      await this.registerSeller();
    }
  }

  async registerSeller() {
    this.isRegistering = true;
    this.failedRegister = false;
    this.errorMessage = '';

    const sellerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      state: 0,
    };

    console.log('Creating seller:', sellerData);

    try {
      // Aquí debes llamar al endpoint /api/Seller para crear el seller
      const response = await this.authService.registerSeller(sellerData);
      if (response?.success && response?.data?.id) {
        this.sellerId = response.data.id;
        this.currentStep = 2;
      } else {
        this.failedRegister = true;
        this.errorMessage = 'Failed to create seller account. Please try again.';
      }
    } catch (error) {
      this.failedRegister = true;
      this.errorMessage = 'An error occurred during registration. Please try again.';
      console.error('Seller registration error:', error);
    } finally {
      this.isRegistering = false;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.failedRegister = false;
      this.errorMessage = '';
    }
  }

  async onSubmit() {
    if (!this.stallName || !this.stallDescription || !this.stallLocation) {
      this.failedRegister = true;
      this.errorMessage = 'Please fill in all market stall information.';
      return;
    }

    if (!this.sellerId) {
      this.failedRegister = true;
      this.errorMessage = 'Seller ID is missing. Please try again.';
      return;
    }

    this.isRegistering = true;
    this.failedRegister = false;
    this.errorMessage = '';

    const marketStallData = {
      name: this.stallName,
      description: this.stallDescription,
      location: this.stallLocation,
      sellerId: this.sellerId,
    };

    console.log('Creating market stall:', marketStallData);

    try {
      const res = await this.authService.createMarketStall(marketStallData);
      if (res?.success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Market stall created successfully!',
        });
        this.router.navigate(['/login']);
      } else {
        this.failedRegister = true;
        this.errorMessage = 'Failed to create market stall. Please try again.';
      }
    } catch (error) {
      this.failedRegister = true;
      this.errorMessage = 'An error occurred while creating the market stall. Please try again.';
      console.error('Market stall creation error:', error);
    } finally {
      this.isRegistering = false;
    }
  }
}
