import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private usersUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(() => console.log('[Fetched] Users'))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${ this.usersUrl }/${ id }`;

    return this.http.get<User>(url).pipe(
      tap(() => console.log(`[Fetched] User #${ id }`))
    );
  }

  createUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap(() => console.log('[Create] User'))
      );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${ this.usersUrl }/${ id }`, this.httpOptions);
  }
}
