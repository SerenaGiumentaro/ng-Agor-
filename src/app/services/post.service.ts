import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  // post: Post = {
  //   id: 0,
  //   user_id: 0,
  //   title: '',
  //   body: '',
  // };

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

  getAllPosts(page: number): Observable<Post[]>{
    return this.http.get<Post[]>(
      `https://gorest.co.in/public/v2/posts?page=${page}&per_page=20`
    ).pipe(
      catchError((err) => {
        alert(err.message)
        return throwError(() => err)
      })
    )
  }
}


