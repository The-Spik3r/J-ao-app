import { Component, inject } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, Utensils } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Utensils = Utensils;
  authService = inject(Auth)

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    await this.authService.logIn(this.email, this.password);
  }

}
