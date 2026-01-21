import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Pollution } from '../../models/pollutions';
import { FavoritesState } from '../../shared/states/favorites.state';
import { RemoveFavorite } from '../../shared/actions/favorites.actions';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css'],
})
export class FavoritesListComponent implements OnInit {
  @Select(FavoritesState.getFavorites) favorites$!: Observable<Pollution[]>;
  favorites: Pollution[] = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.favorites$.subscribe((favs) => {
      this.favorites = favs;
    });
  }

  removeFavorite(pollutionId: number): void {
    this.store.dispatch(new RemoveFavorite(pollutionId));
  }

  viewDetail(id: number): void {
    this.router.navigate(['/pollution', id]);
  }
}
