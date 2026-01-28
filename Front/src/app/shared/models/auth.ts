export interface Auth {
  connexion: Boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
