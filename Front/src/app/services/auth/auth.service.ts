import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthResponse } from '../../shared/models/auth';
import { AuthState } from '../../shared/states/auth-states';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  public login(
    email: string,
    password: string,
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          console.error('Login error:', error);
          return of(null);
        }),
      );
  }

  public register(
    login: string,
    password: string,
    firstname: string,
    lastname: string,
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/register`, {
        login,
        password,
        firstname,
        lastname,
      })
      .pipe(
        catchError((error) => {
          console.error('Registration error:', error);
          return of(null);
        }),
      );
  }

  // Note: logout, getCurrentUser, isLoggedIn, and getToken
  // are now handled directly via the NGXS store
  // Use: store.dispatch(new Logout())
  // Use: store.selectSnapshot(AuthState.getUser)
  // Use: store.selectSnapshot(AuthState.isConnected)
  // Use: store.selectSnapshot(AuthState.getAccessToken)
}
