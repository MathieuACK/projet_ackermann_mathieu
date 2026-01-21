import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, of, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { User } from '../../models/users';
import { SetCurrentUser } from '../../shared/actions/favorites.actions';
import { AuthResponse } from '../../shared/models/auth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000';
  private currentUser$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  constructor(private http: HttpClient, private store: Store) {
    // Initialize store with current user if logged in
    const currentUser = this.currentUser$.value;
    if (currentUser) {
      this.store.dispatch(new SetCurrentUser(currentUser.id));
    }
  }

  public login(
    email: string,
    password: string
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response && response.user) {
            this.currentUser$.next(response.user as User);
            this.store.dispatch(new SetCurrentUser(response.user.id));
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of(null);
        })
      );
  }

  public register(
    login: string,
    password: string,
    firstname: string,
    lastname: string
  ): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/api/auth/register`, {
        login,
        password,
        firstname,
        lastname,
      })
      .pipe(
        tap((response) => {
          if (response && response.user) {
            this.currentUser$.next(response.user as User);
            this.store.dispatch(new SetCurrentUser(response.user.id));
          }
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          return of(null);
        })
      );
  }

  public logout(): void {
    this.currentUser$.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.store.dispatch(new SetCurrentUser(null));
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  public isLoggedIn(): boolean {
    return (
      this.currentUser$.value !== null && !!localStorage.getItem('accessToken')
    );
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
