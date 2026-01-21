import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AuthConnexion,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  Register,
} from '../actions/auth-action';
import { AuthStateModel } from './auth-states-model';
import { AuthService } from '../../services/auth/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    connexion: false,
    accessToken: null,
    user: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isConnected(state: AuthStateModel) {
    return state.connexion;
  }

  @Selector()
  static getAccessToken(state: AuthStateModel) {
    return state.accessToken;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(AuthConnexion)
  add(
    { getState, patchState }: StateContext<AuthStateModel>,
    { payload }: AuthConnexion
  ) {
    patchState({
      connexion: payload.connexion,
    });
  }

  @Action(Login)
  login(
    { dispatch }: StateContext<AuthStateModel>,
    { email, password }: Login
  ) {
    return this.authService.login(email, password).pipe(
      tap((response) => {
        if (response) {
          dispatch(new LoginSuccess(response.accessToken, response.user));
        } else {
          dispatch(new LoginFailure('Invalid credentials'));
        }
      }),
      catchError((error) => {
        dispatch(new LoginFailure(error.message || 'Login failed'));
        return of(null);
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<AuthStateModel>,
    { accessToken, user }: LoginSuccess
  ) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('currentUser', JSON.stringify(user));

    patchState({
      connexion: true,
      accessToken,
      user,
    });
  }

  @Action(LoginFailure)
  loginFailure(
    { patchState }: StateContext<AuthStateModel>,
    { error }: LoginFailure
  ) {
    console.error('Login failed:', error);
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');

    patchState({
      connexion: false,
      accessToken: null,
      user: null,
    });
  }

  @Action(Register)
  register(
    { dispatch }: StateContext<AuthStateModel>,
    { login, password, firstname, lastname }: Register
  ) {
    return this.authService.register(login, password, firstname, lastname).pipe(
      tap((response) => {
        if (response) {
          dispatch(new LoginSuccess(response.accessToken, response.user));
        } else {
          dispatch(new LoginFailure('Registration failed'));
        }
      }),
      catchError((error) => {
        dispatch(new LoginFailure(error.message || 'Registration failed'));
        return of(null);
      })
    );
  }
}
