import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(
  ): boolean {
    if (localStorage.getItem('isLoggedIn')) {
      return true;
    } else {
      this.route.navigate(['/login-signup']);
      return false;
    }
  }
}
