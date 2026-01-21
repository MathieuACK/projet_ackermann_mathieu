import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../shared/states/auth-states';

/**
 * Auth Guard to protect routes requiring authentication
 */
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const isConnected = store.selectSnapshot(AuthState.isConnected);
  const token = store.selectSnapshot(AuthState.getAccessToken);

  if (isConnected && token) {
    return true;
  }

  // Redirect to login page
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
