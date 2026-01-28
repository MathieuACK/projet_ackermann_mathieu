import { Pollution } from '../../models/pollutions';

export interface FavoriteItem {
  userId: number;
  pollution: Pollution;
}

export interface FavoritesStateModel {
  favorites: FavoriteItem[];
  currentUserId: number | null;
}
