import { Pollution } from '../../models/pollutions';

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public pollution: Pollution) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public pollutionId: number) {}
}

export class ClearFavorites {
  static readonly type = '[Favorites] Clear All';
}

export class SetCurrentUser {
  static readonly type = '[Favorites] Set Current User';
  constructor(public userId: number | null) {}
}
