import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { postsUrl, usersUlr } from '../api.config';
import { Post } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getUserPosts(user_id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${usersUlr}/${user_id}/posts`).pipe(
      catchError((err) => {
        console.error(err.message);
        return throwError(() => err);
      })
    );
  }
  getAllPostSize(url: string) {
    return this.http.get(url, {
      observe: 'response',
    });
  }

  getAllPosts(page: number, perPage: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${postsUrl}?page=${page}&per_page=${perPage}`)
      .pipe(
        catchError((err) => {
          console.error(err.message);
          return throwError(() => err);
        })
      );
  }

  getAllPostsBySearch(params: HttpParams, page: number, perPage: number): Observable<HttpResponse<Post[]>> {
    return this.http
      .get<Post[]>(`${postsUrl}?page=${page}&per_page=${perPage}&`, { params, observe: 'response' })
      .pipe(
        catchError((err) => {
          console.error(err.message);
          return throwError(() => err);
        })
      );
  }
}
