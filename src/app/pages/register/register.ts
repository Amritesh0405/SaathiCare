import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form = {
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  };

  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.password !== this.form.confirmPassword) {
      this.errorMsg = 'Passwords do not match!';
      return;
    }
    if (this.form.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters!';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const { confirmPassword, ...registerData } = this.form;

    this.authService.register(registerData).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = '✅ Account created! Redirecting...';
        this.authService.saveToken(res.token, res.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Registration failed!';
        this.loading = false;
      }
    });
  }
}