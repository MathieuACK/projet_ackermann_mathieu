import { Pollution } from '../../models/pollutions';

export interface FavoriteItem {
  userId: string;
  pollution: Pollution;
}

export interface FavoritesStateModel {
  favorites: FavoriteItem[];
  currentUserId: string | null;
}
