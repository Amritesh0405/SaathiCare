import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SAMPLE_BOOKINGS, HELPERS } from '../../constants/data';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  activeTab = 'dashboard';
  bookings = SAMPLE_BOOKINGS;
  helpers = HELPERS;

  stats = {
    totalBookings: 3,
    todayBookings: 1,
    totalHelpers: 6,
    activeHelpers: 5,
    totalRevenue: 1050,
    todayRevenue: 300
  };

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }

  updateStatus(booking: any, status: string) {
    booking.status = status;
  }
}