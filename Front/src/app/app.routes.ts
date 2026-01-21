import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Lazy-load the Pollution feature module - accessible without authentication
  { path: '', redirectTo: '/pollution/list', pathMatch: 'full' },
  {
    path: 'pollution',
    loadChildren: () =>
      import('./pollution/pollution.module').then(
        (lazyLoadedModule) => lazyLoadedModule.PollutionModule
      ),
  },
  { path: '**', redirectTo: '/pollution/list' },
];
