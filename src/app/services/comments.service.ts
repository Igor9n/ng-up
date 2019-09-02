import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private commentsUrl = 'http://localhost:8080/api/comments';

  constructor(
    private http: HttpClient,
  ) {
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl)
      .pipe(
        tap(() => console.log('[Fetched] Comments'))
      );
  }

  getComment(id: number): Observable<Comment> {
    const url = `${ this.commentsUrl }/${ id }`;

    return this.http.get<Comment>(url).pipe(
      tap(() => console.log(`[Fetched] Comment #${ id }`))
    );
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.put(this.commentsUrl, comment, this.httpOptions)
      .pipe(
        tap(() => console.log('[Create] Comment'))
      );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${ this.commentsUrl }/${ id }`, this.httpOptions);
  }
}
