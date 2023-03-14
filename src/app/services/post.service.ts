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
        console.error(`Post Service getting user post: ${err.message}`);
        return throwError(() => err);
      })
    );
  }
  getAllPostSize(url: string) {
    return this.http.get(url, {
      observe: 'response',
    });
  }

  getAllPosts(page: number, perPage: number): Observable<HttpResponse<Post[]>> {
    return this.http
      .get<Post[]>(`${postsUrl}?page=${page}&per_page=${perPage}`, {observe: 'response'})
      .pipe(
        catchError((err) => {
          console.error(`Post Service getting all posts: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  getAllPostsBySearch(params: HttpParams, page: number, perPage: number): Observable<HttpResponse<Post[]>> {
    return this.http
      .get<Post[]>(`${postsUrl}?page=${page}&per_page=${perPage}&`, { params, observe: 'response' })
      .pipe(
        catchError((err) => {
          console.error(`Post Service research: ${err.message}`);
          return throwError(() => err);
        })
      );
  }

  newPost(id: number, title: string, body: string){
    return this.http.post(`${usersUlr}/${id}/posts`, {title: title, body: body}).pipe(
      catchError((err)=> {
        console.error(`Post Service creating new post: ${err.message}`)
        return throwError(()=> err)
      })
    )
  }
}
