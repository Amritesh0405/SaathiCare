import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  activeTab = 'bookings';
  user: any;
  bookings: any[] = [];
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  extendBooking(booking: any) {
    this.bookingService.extendBooking(booking._id).subscribe({
      next: (res) => {
        booking.hours = res.booking.hours;
        booking.totalAmount = res.booking.totalAmount;
        alert(`✅ Extended! New total: ₹${res.booking.totalAmount}`);
      },
      error: () => alert('Extension failed!')
    });
  }

  logout() {
    this.authService.logout();
  }
}