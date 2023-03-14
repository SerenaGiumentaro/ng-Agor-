import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { usersUlr } from '../api.config';
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
          console.log(err.message);
          return throwError(() => err);
        })
      );
  }

  getAllUsers(page: number, perPage: number): Observable< HttpResponse< User[]>> {
    return this.http
      .get<User[]>(
        `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`,
        {observe: 'response'}
      )
      .pipe(
        catchError((err) => {
          console.error(`User Service error: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  getUserFromSearch(params: HttpParams):Observable<HttpResponse<User[]>>{
    return this.http.get<User[]>(`${usersUlr}?${params}&per_page=100`, {observe: 'response'}).pipe(
      catchError((err)=> {
        console.error(`User Service researching error: ${err.message}`)
        return throwError(()=> err)
      })
    )
  }
}
