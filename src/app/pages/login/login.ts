import { Component } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, Utensils } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

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

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
  }

}
