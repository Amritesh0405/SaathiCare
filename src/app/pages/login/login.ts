import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form = {
    phone: '',
    password: ''
  };

  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.form.phone || !this.form.password) {
      this.errorMsg = 'Please fill in all fields!';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.login(this.form).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = '✅ Login successful! Redirecting...';
        this.authService.saveToken(res.token, res.user);
        setTimeout(() => {
          if (res.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 1500);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed!';
        this.loading = false;
      }
    });
  }
}