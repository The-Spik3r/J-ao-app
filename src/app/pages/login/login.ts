import { Component, inject } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, Utensils } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, FormsModule, ToastModule],
  templateUrl: './login.html',
  providers: [MessageService],
  styleUrl: './login.css',
})
export class Login {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly Utensils = Utensils;
  authService = inject(Auth);
  messageService = inject(MessageService);
  router = inject(Router);
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  failedLogin: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    const res = await this.authService.logIn(this.email, this.password);
    this.messageService.add({
      severity: res?.success ? 'success' : 'contrast',
      summary: res?.success ? 'Login Successful' : 'Login Failed',
      detail:
        (res?.message as string) ||
        (res?.success ? 'You have logged in successfully.' : 'Invalid email or password.'),
    });
    setTimeout(() => {
      this.messageService.clear();
      this.router.navigate(['/']);
    }, 2000);
    if (!res?.success) {
      this.failedLogin = true;
    }
  }
}
