import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Book } from './pages/book/book';
import { Helpers } from './pages/helpers/helpers';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Admin } from './pages/admin/admin';
import { Verify } from './pages/verify/verify';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'book', component: Book },
  { path: 'helpers', component: Helpers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin', component: Admin },
  { path: 'verify', component: Verify },
  { path: '**', redirectTo: '' }
];