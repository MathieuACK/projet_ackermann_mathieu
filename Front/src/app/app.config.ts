import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { routes } from './app.routes';
import { FavoritesState } from './shared/states/favorites.state';
import { AuthState } from './shared/states/auth-states';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(
      [FavoritesState, AuthState],
      withNgxsStoragePlugin({
        keys: ['favorites', 'auth'], // Persist favorites and auth state
      })
    ),
  ],
};
