import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PollutionModule } from './pollution/pollution.module';
import { AuthService } from './services/auth/auth.service';
import { FavoritesState } from './shared/states/favorites.state';
import { Logout } from './shared/actions/auth-action';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PollutionModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Pollution Tracker';
  userName = '';

  @Select(FavoritesState.getFavoritesCount)
  favoritesCount$!: Observable<number>;

  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((u) => {
      this.userName = u ? `${u.firstname} ${u.lastname}` : '';
    });
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
