import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SERVICES, PRICING } from '../../constants/data';
import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-book',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book.html',
  styleUrl: './book.css'
})
export class Book {
  step = 1;
  services = SERVICES;
  pricing = PRICING;
  loading = false;
  errorMsg = '';

  booking = {
    service: '',
    serviceIcon: '',
    hasVehicle: '',
    date: '',
    time: '',
    hours: 1,
    name: '',
    phone: '',
    address: '',
    notes: '',
    allowExtension: true
  };

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  get totalPrice(): number {
    return this.booking.hours * PRICING.perHour;
  }

  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  selectService(service: any) {
    this.booking.service = service.name;
    this.booking.serviceIcon = service.icon;
  }

  nextStep() {
    if (this.step < 4) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  canProceed(): boolean {
    if (this.step === 1) return !!this.booking.service;
    if (this.step === 2) return !!this.booking.hasVehicle;
    if (this.step === 3) return !!this.booking.date && !!this.booking.time;
    return true;
  }

  submitBooking() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const bookingData = {
      service: this.booking.service,
      serviceIcon: this.booking.serviceIcon,
      hasVehicle: this.booking.hasVehicle === 'yes',
      date: this.booking.date,
      time: this.booking.time,
      hours: this.booking.hours,
      address: this.booking.address,
      notes: this.booking.notes,
      allowExtension: this.booking.allowExtension
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (res) => {
        this.loading = false;
        alert(`✅ Booking confirmed!\n\n🔐 Your OTP: ${res.otp}\n\nShare this OTP with your helper when they arrive.`);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Booking failed!';
      }
    });
  }
}