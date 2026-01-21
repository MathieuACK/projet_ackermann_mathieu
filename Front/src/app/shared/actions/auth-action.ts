import { Auth } from '../models/auth';
import { User } from '../../models/users';

export class AuthConnexion {
  static readonly type = '[Auth] Connexion';

  constructor(public payload: Auth) {}
}

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public email: string, public password: string) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';

  constructor(public accessToken: string, public user: User) {}
}

export class LoginFailure {
  static readonly type = '[Auth] Login Failure';

  constructor(public error: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class Register {
  static readonly type = '[Auth] Register';

  constructor(
    public login: string,
    public password: string,
    public firstname: string,
    public lastname: string
  ) {}
}
