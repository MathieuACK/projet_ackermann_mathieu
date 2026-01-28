import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PollutionsService } from '../../services/pollutions/pollutions.service';
import { Pollution } from '../../models/pollutions';
import { FavoritesState } from '../../shared/states/favorites.state';
import { AuthState } from '../../shared/states/auth-states';
import {
  AddFavorite,
  RemoveFavorite,
} from '../../shared/actions/favorites.actions';

@Component({
  selector: 'app-pollution-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pollution-detail.component.html',
  styleUrl: './pollution-detail.component.css',
})
export class PollutionDetailComponent implements OnInit {
  pollution: Pollution | null = null;
  loading: boolean = true;
  error: string = '';
  editMode: boolean = false;
  editablePollution: Pollution | null = null;

  isLogged = false;

  @Select(AuthState.isConnected)
  isConnected$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollutionsService: PollutionsService,
    private store: Store,
  ) {
    // Subscribe to connection state from NGXS store
    this.isConnected$.subscribe((connected) => {
      this.isLogged = connected;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPollution(Number(id));
    } else {
      this.error = 'ID de pollution invalide';
      this.loading = false;
    }
  }

  loadPollution(id: number): void {
    this.pollutionsService.getPollutionById(id).subscribe({
      next: (data) => {
        this.pollution = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la pollution:', err);
        this.error = 'Impossible de charger les détails de cette pollution';
        this.loading = false;
      },
    });
  }

  deletePollution(): void {
    if (!this.pollution) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionsService.deletePollution(this.pollution.id).subscribe({
        next: () => {
          alert('Pollution supprimée avec succès');
          this.router.navigate(['/pollution', 'list']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression de la pollution');
        },
      });
    }
  }

  enterEdit(): void {
    if (!this.pollution) return;
    this.editMode = true;
    this.editablePollution = { ...this.pollution };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editablePollution = null;
  }

  saveEdit(): void {
    if (!this.editablePollution) return;
    const id = this.editablePollution.id;
    this.pollutionsService
      .updatePollution(id, this.editablePollution)
      .subscribe({
        next: (updated) => {
          this.pollution = { ...this.editablePollution! };
          this.editMode = false;
          this.editablePollution = null;
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour:', err);
          alert('Erreur lors de la mise à jour de la pollution');
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/pollution', 'list']);
  }

  openMap(): void {
    if (this.pollution) {
      const url = `https://www.google.com/maps?q=${this.pollution.latitude},${this.pollution.longitude}`;
      window.open(url, '_blank');
    }
  }

  isFavorite(): boolean {
    if (!this.pollution) return false;
    return this.store.selectSnapshot(FavoritesState.isFavorite)(
      this.pollution.id,
    );
  }

  toggleFavorite(): void {
    if (!this.pollution) return;
    if (this.isFavorite()) {
      this.store.dispatch(new RemoveFavorite(this.pollution.id));
    } else {
      this.store.dispatch(new AddFavorite(this.pollution));
    }
  }
}
