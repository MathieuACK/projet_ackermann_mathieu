import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login, Register } from '../../shared/actions/auth-action';
import { AuthState } from '../../shared/states/auth-states';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  firstname = '';
  lastname = '';
  login = '';
  password = '';
  error = '';
  signupMode = false;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  submit() {
    this.error = '';

    if (!this.signupMode) {
      // Login with JWT - Check store instead of localStorage
      this.store.dispatch(new Login(this.login, this.password)).subscribe({
        next: () => {
          // Check if login was successful via NGXS store
          const token = this.store.selectSnapshot(AuthState.getAccessToken);
          if (token) {
            this.router.navigate(['/pollution/list']);
          } else {
            this.error = 'Identifiants invalides';
          }
        },
        error: (err) => {
          this.error = 'Erreur de connexion';
        },
      });
    } else {
      // Register - Check store instead of localStorage
      this.store
        .dispatch(
          new Register(
            this.login,
            this.password,
            this.firstname,
            this.lastname,
          ),
        )
        .subscribe({
          next: () => {
            // Check if registration was successful via NGXS store
            const token = this.store.selectSnapshot(AuthState.getAccessToken);
            if (token) {
              this.router.navigate(['/pollution/list']);
            } else {
              this.error = 'Impossible de créer le compte (login peut exister)';
            }
          },
          error: (err) => {
            this.error = "Erreur lors de l'inscription";
          },
        });
    }
  }

  toggleSignup() {
    this.signupMode = !this.signupMode;
    this.error = '';
  }
}
