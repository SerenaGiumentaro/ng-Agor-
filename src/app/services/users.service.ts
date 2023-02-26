import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  // user: User = {
  //   name: '',
  //   email: '',
  //   status: '',
  //   gender: '',
  //   id: 0,
  // };

  getUser(id: number, user: User) {
    this.http
      .get<User>(`https://gorest.co.in/public/v2/users/${id}`)
      .subscribe({
        next: (res) => {
          (user.name = res.name),
            (user.email = res.email),
            (user.status = res.status),
            (user.gender = res.gender);
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }

  getAllUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(
      `https://gorest.co.in/public/v2/users?page=${page}&per_page=20`
    ).pipe(
      catchError((err) => {
        alert(err.message)
        return throwError(() => err)
      })
    )
  }
}
