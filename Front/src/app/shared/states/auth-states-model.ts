import { User } from '../../models/users';

export interface AuthStateModel {
  connexion: Boolean;
  accessToken: string | null;
  user: User | null;
}
