import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`https://gorest.co.in/public/v2/users/${id}`)
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => err);
        })
      );
  }

  getAllUsers(page: number): Observable<User[]> {
    return this.http
      .get<User[]>(
        `https://gorest.co.in/public/v2/users?page=${page}&per_page=20`
      )
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => err);
        })
      );
  }
}
