import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  createBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  getUserBookings(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }, { headers: this.getHeaders() });
  }

  extendBooking(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/extend`, {}, { headers: this.getHeaders() });
  }

  verifyOTP(bookingId: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { bookingId, otp });
  }

  endWork(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/end`, {}, { headers: this.getHeaders() });
  }
}