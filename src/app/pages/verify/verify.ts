import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SAMPLE_BOOKINGS } from '../../constants/data';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify.html',
  styleUrl: './verify.css'
})
export class Verify {
  form = {
    bookingId: '',
    otp: ''
  };

  status: 'idle' | 'working' | 'done' = 'idle';
  errorMsg = '';
  booking: any = null;
  startTime: Date | null = null;
  elapsedMinutes = 0;
  timer: any = null;

  verify() {
    this.errorMsg = '';
    const found = SAMPLE_BOOKINGS.find(
      b => b.id === this.form.bookingId.toUpperCase().trim() &&
           b.otp === this.form.otp.toString().trim()
    );
  
    if (!found) {
      this.errorMsg = 'Invalid Booking ID or OTP. Please check and try again.';
      return;
    }
  
    this.booking = found;
    this.status = 'working';
    this.startTime = new Date();
  
    this.timer = setInterval(() => {
      const now = new Date();
      this.elapsedMinutes = Math.floor(
        (now.getTime() - this.startTime!.getTime()) / 60000
      );
    }, 60000);
  }
  
  endWork() {
    clearInterval(this.timer);
    this.status = 'done';
  }

  get elapsedTime(): string {
    const hrs = Math.floor(this.elapsedMinutes / 60);
    const mins = this.elapsedMinutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins} minutes`;
  }
}