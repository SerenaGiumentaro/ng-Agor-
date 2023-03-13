import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Comment } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getPostComments(post_id: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(
        `https://gorest.co.in/public/v2/posts/${post_id}/comments`
      )
      .pipe(
        catchError((err) => {
          console.error(err.message);
          return throwError(() => err);
        })
      );
  }
}
