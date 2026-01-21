import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendClient}/api/users`);
  }

  public addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(
      `${environment.backendClient}/api/users`,
      user as User
    );
  }
}
