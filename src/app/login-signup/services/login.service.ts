import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError , BehaviorSubject} from 'rxjs';
import { usersUlr } from 'src/app/api.config';
import { User } from '../../interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private route: Router) {}
  currentUser!: User[];
  isLogged = new BehaviorSubject<boolean>(false)
  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn(){
    return this.isLogged.asObservable()
  }
  checkUser(params: HttpParams): Observable<User[]> {
    return this.http
      .get<User[]>(`${usersUlr}?`, {
        params,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout() {
    this.isLogged.next(false)
    localStorage.clear();
    this.route.navigate(['login-signup']);
  }

  login(){
    this.isLogged.next(true)
    this.route.navigate(['users'])
  }
}
