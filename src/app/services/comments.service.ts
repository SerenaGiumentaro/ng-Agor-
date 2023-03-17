import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { postsUrl } from '../api.config';
import { Comment } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getPostComments(post_id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${postsUrl}/${post_id}/comments`).pipe(
      catchError((err) => {
        console.error(err.message);
        return throwError(() => err);
      })
    );
  }

  postNewComment(
    postId: number,
    userName: string,
    userEmail: string,
    comment: string
  ): Observable<Comment> {
    return this.http.post<Comment>(`${postsUrl}/${postId}/comments`, {
      post_id: postId,
      name: userName,
      email: userEmail,
      body: comment,
    }).pipe(
      catchError((err)=> {
        console.error(err.message)
        return throwError(()=> err)
      })
    );
  }
}
