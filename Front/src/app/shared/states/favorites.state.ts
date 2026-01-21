import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FavoritesStateModel, FavoriteItem } from '../models/favorites';
import {
  AddFavorite,
  RemoveFavorite,
  ClearFavorites,
  SetCurrentUser,
} from '../actions/favorites.actions';
import { Pollution } from '../../models/pollutions';

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: [],
    currentUserId: null,
  },
})
@Injectable()
export class FavoritesState {
  @Selector()
  static getFavorites(state: FavoritesStateModel): Pollution[] {
    if (!state.currentUserId) {
      return [];
    }
    return state.favorites
      .filter((item) => item.userId === state.currentUserId)
      .map((item) => item.pollution);
  }

  @Selector()
  static getFavoritesCount(state: FavoritesStateModel): number {
    if (!state.currentUserId) {
      return 0;
    }
    return state.favorites.filter((item) => item.userId === state.currentUserId)
      .length;
  }

  @Selector()
  static isFavorite(state: FavoritesStateModel) {
    return (pollutionId: number) => {
      if (!state.currentUserId) {
        return false;
      }
      return state.favorites.some(
        (item) =>
          item.userId === state.currentUserId &&
          item.pollution.id === pollutionId
      );
    };
  }

  @Action(SetCurrentUser)
  setCurrentUser(
    ctx: StateContext<FavoritesStateModel>,
    action: SetCurrentUser
  ) {
    ctx.patchState({
      currentUserId: action.userId,
    });
  }

  @Action(AddFavorite)
  add(ctx: StateContext<FavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState();

    if (!state.currentUserId) {
      console.warn('Cannot add favorite: no user logged in');
      return;
    }

    const exists = state.favorites.some(
      (item) =>
        item.userId === state.currentUserId &&
        item.pollution.id === action.pollution.id
    );

    if (!exists) {
      const newItem: FavoriteItem = {
        userId: state.currentUserId,
        pollution: action.pollution,
      };
      ctx.patchState({
        favorites: [...state.favorites, newItem],
      });
    }
  }

  @Action(RemoveFavorite)
  remove(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState();

    if (!state.currentUserId) {
      return;
    }

    ctx.patchState({
      favorites: state.favorites.filter(
        (item) =>
          !(
            item.userId === state.currentUserId &&
            item.pollution.id === action.pollutionId
          )
      ),
    });
  }

  @Action(ClearFavorites)
  clear(ctx: StateContext<FavoritesStateModel>) {
    const state = ctx.getState();

    if (!state.currentUserId) {
      return;
    }

    // Clear only current user's favorites
    ctx.patchState({
      favorites: state.favorites.filter(
        (item) => item.userId !== state.currentUserId
      ),
    });
  }
}
