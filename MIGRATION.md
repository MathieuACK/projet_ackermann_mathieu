# Migration Guide - TP06 vers TP07

## Changements Backend

### 1. Nouvelles Dépendances

```bash
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

### 2. Configuration (.env)

Ajouter les variables JWT :

```env
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRES_IN=24h
```

### 3. Nouveaux Fichiers

- `api/controllers/auth.controllers.ts` - Gestion login/register
- `api/middlewares/auth.middleware.ts` - Vérification JWT
- `api/routes/auth.routes.ts` - Routes d'authentification

### 4. Modifications

- `api/controllers/user.controllers.ts` - Ajout hachage bcrypt
- `api/routes/user.routes.ts` - Protection avec authenticateJWT
- `api/routes/pollution.routes.ts` - Protection des endpoints POST/PUT/DELETE
- `api/config.ts` - Ajout JWT_SECRET et JWT_EXPIRES_IN

## Changements Frontend

### 1. Nouveaux Fichiers

- `Front/src/app/interceptors/auth.interceptor.ts` - Injection du token JWT
- `Front/src/app/guards/auth.guard.ts` - Protection des routes
- `Front/src/app/shared/actions/auth-action.ts` - Actions NGXS (Login, Logout, etc.)

### 2. Modifications

- `Front/src/app/services/auth/auth.service.ts` - Appels API JWT
- `Front/src/app/shared/states/auth-states.ts` - Gestion état JWT
- `Front/src/app/shared/states/auth-states-model.ts` - Modèle avec token
- `Front/src/app/shared/models/auth.ts` - Interfaces JWT
- `Front/src/app/components/login/login.component.ts` - Utilisation NGXS
- `Front/src/app/app.config.ts` - Ajout interceptor et AuthState
- `Front/src/app/app.routes.ts` - Protection avec authGuard
- `Front/src/app/app.component.ts` - Logout avec NGXS
- `Front/src/environments/environment*.ts` - Ajout apiUrl

## Tests après Migration

### Backend

1. Créer un utilisateur via `/api/auth/register`
2. Se connecter via `/api/auth/login` → obtenir un token
3. Tester un endpoint protégé avec le token :
   ```bash
   curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users
   ```
4. Vérifier qu'une requête sans token retourne 401

### Frontend

1. Accéder à l'app → redirection vers `/login`
2. Créer un compte → connexion automatique
3. Vérifier que le token est dans localStorage
4. Créer une pollution → vérifier que le header Authorization est présent
5. Se déconnecter → retour à `/login`
6. Recharger la page connecté → rester connecté (persistance)

## Points d'Attention

### Backend

- Les mots de passe existants doivent être re-hashés
- Le JWT_SECRET doit être fort (32+ caractères)
- Tous les endpoints sensibles doivent utiliser `authenticateJWT`

### Frontend

- Le token expire après JWT_EXPIRES_IN (défaut 24h)
- L'interceptor s'applique à TOUTES les requêtes HTTP
- Le guard protège les routes, pas les composants individuels
- Penser à gérer le cas d'expiration du token (401 → logout)

## Déploiement

### Render.com

1. Ajouter les variables d'environnement :
   - `JWT_SECRET` (générer un secret fort)
   - `JWT_EXPIRES_IN` (ex: 24h)
2. Redéployer l'API

3. Mettre à jour l'URL de l'API dans le frontend :

   - `environment.prod.ts` → `apiUrl`

4. Redéployer le frontend

## Rollback si Problème

Si nécessaire, revenir à TP06 :

1. Backend : retirer les middleware `authenticateJWT`
2. Frontend : retirer le `authGuard` des routes
3. Garder les endpoints `/api/auth/*` pour compatibilité future
