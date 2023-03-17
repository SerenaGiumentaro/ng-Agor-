import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { usersUlr } from '../api.config';
import { User, UserBody } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  selectedUser!: User;
  getSelectedUser() {
    return this.selectedUser;
  }
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`https://gorest.co.in/public/v2/users/${id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getAllUsers(page: number, perPage: number): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(
        `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`,
        { observe: 'response' }
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getUserFromSearch(params: HttpParams): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(`${usersUlr}?${params}&per_page=100`, {
        observe: 'response',
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  newUser(user: UserBody): Observable<User> {
    return this.http.post<User>(`${usersUlr}`, user).pipe(
      catchError((err) => {
        return throwError(() => new err());
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${usersUlr}/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
