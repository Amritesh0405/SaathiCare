import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  activeTab = 'dashboard';
  bookings: any[] = [];
  users: any[] = [];
  helpers: any[] = [];  
  loading = false;

  stats = {
    totalBookings: 0,
    totalUsers: 0,
    totalHelpers: 0,
    pendingBookings: 0,
    totalRevenue: 0
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadBookings();
    this.loadUsers();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (res) => this.stats = res,
      error: (err) => console.error(err)
    });
  }

  loadBookings() {
    this.loading = true;
    this.adminService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res) => this.users = res.users,
      error: (err) => console.error(err)
    });
  }

  updateStatus(booking: any, status: string) {
    this.adminService.updateBookingStatus(booking._id, status).subscribe({
      next: (res) => {
        booking.status = status;
      },
      error: () => alert('Failed to update status!')
    });
  }

  logout() {
    this.authService.logout();
  }
}