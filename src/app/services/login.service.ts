import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private route: Router) {}
  currentUser!: User[];

  getCurrentUser() {
    return this.currentUser;
  }
  checkUser(params: HttpParams): Observable<User[]> {
    return this.http
      .get<User[]>('https://gorest.co.in/public/v2/users?', {
        params,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
