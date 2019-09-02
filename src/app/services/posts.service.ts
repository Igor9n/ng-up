import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private postsUrl = 'http://localhost:8080/api/posts';

  constructor(
    private http: HttpClient,
  ) {
  }

  getPosts = (): Observable<Post[]> => {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(() => console.log('[Fetched] Posts'))
      );
  }
}
