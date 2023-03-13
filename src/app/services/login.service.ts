import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  // token: string = 'd11e8e040d7e2cb88ff136e0f80d4057b11811393f419fb0f962023acc2d2489'

  checkUser(params: HttpParams):Observable<User[]> {
    return this.http.get<User[]>('https://gorest.co.in/public/v2/users?', {
      params,
    }).pipe(
      catchError((err) => {
        console.error(err.message);
        return throwError(() => err);
      })
    );
  }
}
