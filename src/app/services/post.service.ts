import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getUserPosts(user_id: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`https://gorest.co.in/public/v2/users/${user_id}/posts`)
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => err);
        })
      );
  }
getAllPostSize(){
  return this.http.get('https://gorest.co.in/public/v2/posts', {observe: 'response'})
}

  getAllPosts(page: number, perPage: number): Observable<Post[]>{
    return this.http.get<Post[]>(
      `https://gorest.co.in/public/v2/posts?page=${page}&per_page=${perPage}`
    ).pipe(
      catchError((err) => {
        alert(err.message)
        return throwError(() => err)
      })
    )
  }
}


