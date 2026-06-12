import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string, user: any) {
    localStorage.setItem('sc_token', token);
    localStorage.setItem('sc_user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('sc_token');
  }

  getUser(): any {
    const user = localStorage.getItem('sc_user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  logout() {
    localStorage.removeItem('sc_token');
    localStorage.removeItem('sc_user');
    this.router.navigate(['/login']);
  }
}