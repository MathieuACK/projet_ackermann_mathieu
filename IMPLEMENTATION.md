# TP07 - Implémentation JWT - Résumé

## ✅ Implémentation Complétée

### Backend (Node.js/Express)

#### 1. Dépendances Ajoutées

- `jsonwebtoken` - Génération et vérification de tokens JWT
- `bcryptjs` - Hachage sécurisé des mots de passe
- Types TypeScript correspondants

#### 2. Nouveaux Fichiers

- **`api/controllers/auth.controllers.ts`**

  - `login()` - Authentification avec JWT
  - `register()` - Inscription avec mot de passe hashé

- **`api/middlewares/auth.middleware.ts`**

  - `authenticateJWT()` - Middleware de vérification JWT
  - Vérifie le header `Authorization: Bearer <token>`
  - Décode et valide le token

- **`api/routes/auth.routes.ts`**
  - `POST /api/auth/login` - Endpoint public de connexion
  - `POST /api/auth/register` - Endpoint public d'inscription

#### 3. Endpoints Sécurisés

✅ Routes protégées (nécessitent JWT) :

- `POST /api/pollutions` - Créer une pollution
- `PUT /api/pollutions/:id` - Modifier une pollution
- `DELETE /api/pollutions/:id` - Supprimer une pollution
- `GET /api/users` - Liste des utilisateurs

🌐 Routes publiques :

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/pollutions` - Liste des pollutions
- `GET /api/pollutions/:id` - Détail pollution

#### 4. Configuration

Variables d'environnement dans `.env` :

```env
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=24h
```

### Frontend (Angular)

#### 1. NGXS State Management

- **`auth-states.ts`** - State NGXS avec actions Login/Logout/Register
- **`auth-states-model.ts`** - Interface avec `accessToken`, `user`, `connexion`
- **`auth-action.ts`** - Actions: Login, LoginSuccess, LoginFailure, Logout, Register

#### 2. Services

- **`auth.service.ts`**
  - `login()` - Appel API /api/auth/login
  - `register()` - Appel API /api/auth/register
  - `logout()` - Nettoyage localStorage et state
  - `getToken()` - Récupération du token
  - `isLoggedIn()` - Vérification de l'état de connexion

#### 3. Sécurité Frontend

- **`auth.interceptor.ts`** - Injection automatique du token JWT dans les requêtes HTTP
- **`auth.guard.ts`** - Protection des routes nécessitant authentification

#### 4. Components

- **`login.component.ts`**

  - Formulaire login/register
  - Dispatch actions NGXS
  - Redirection après connexion

- **`app.component.ts`**
  - Bouton logout
  - Dispatch action Logout + redirection

#### 5. Configuration

- `app.config.ts` - Enregistrement AuthState et authInterceptor
- `app.routes.ts` - Application authGuard sur routes /pollution
- `environment.ts` / `environment.prod.ts` - Configuration apiUrl

### Fonctionnalités

#### Workflow d'Authentification

1. **Inscription** : email + password → hash bcrypt → création user → retour JWT
2. **Connexion** : email + password → vérification bcrypt → génération JWT
3. **Requêtes protégées** : Interceptor injecte `Authorization: Bearer <token>`
4. **Validation** : Middleware vérifie et décode le token
5. **Déconnexion** : Suppression du token et redirection

#### Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ Tokens JWT signés avec secret fort
- ✅ Expiration configurable des tokens
- ✅ Validation côté serveur sur chaque requête protégée
- ✅ Pas de stockage de mot de passe en clair
- ✅ Pas de retour de password dans les réponses API

## 📁 Fichiers Créés/Modifiés

### Backend

```
api/
├── controllers/
│   ├── auth.controllers.ts (CRÉÉ)
│   └── user.controllers.ts (MODIFIÉ - hash password)
├── middlewares/
│   └── auth.middleware.ts (CRÉÉ)
├── routes/
│   ├── auth.routes.ts (CRÉÉ)
│   ├── index.ts (MODIFIÉ)
│   ├── user.routes.ts (MODIFIÉ - protection JWT)
│   └── pollution.routes.ts (MODIFIÉ - protection JWT)
├── config.ts (MODIFIÉ - JWT_SECRET)
├── package.json (MODIFIÉ - dependencies)
└── .env.example (CRÉÉ)
```

### Frontend

```
Front/src/app/
├── components/
│   └── login/
│       └── login.component.ts (MODIFIÉ - NGXS)
├── guards/
│   └── auth.guard.ts (CRÉÉ)
├── interceptors/
│   └── auth.interceptor.ts (CRÉÉ)
├── services/
│   └── auth/
│       └── auth.service.ts (MODIFIÉ - JWT API)
├── shared/
│   ├── actions/
│   │   └── auth-action.ts (MODIFIÉ - nouvelles actions)
│   ├── models/
│   │   └── auth.ts (MODIFIÉ - AuthResponse, LoginRequest)
│   └── states/
│       ├── auth-states.ts (MODIFIÉ - gestion JWT)
│       └── auth-states-model.ts (MODIFIÉ - token + user)
├── models/
│   └── users.ts (MODIFIÉ - password optionnel)
├── app.config.ts (MODIFIÉ - interceptor + AuthState)
├── app.routes.ts (MODIFIÉ - authGuard)
└── app.component.ts (MODIFIÉ - logout NGXS)
```

## 🧪 Tests à Effectuer

### Backend

```bash
# 1. Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"login":"test@test.com","password":"test123","firstname":"Test","lastname":"User"}'

# 2. Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# 3. Requête protégée avec token
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <TOKEN>"

# 4. Requête protégée sans token (devrait retourner 401)
curl -X GET http://localhost:3000/api/users
```

### Frontend

1. Aller sur `/pollution/list` → redirection vers `/login`
2. S'inscrire avec un nouveau compte
3. Vérifier localStorage → `accessToken` présent
4. Créer une pollution (requête avec token)
5. Se déconnecter → retour à `/login`
6. Recharger la page → rester connecté (persistance)

## 📦 Déploiement

### Variables d'environnement Render

Ajouter dans les settings :

- `JWT_SECRET` (générer un secret fort de 32+ caractères)
- `JWT_EXPIRES_IN` (ex: `24h`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### Build et Deploy

```bash
# Backend
cd api
npm install
npm run build
npm start

# Frontend
cd Front
npm install
ng build --configuration production
```

## ✅ Conformité TP07

- ✅ Endpoint POST /api/auth/login avec JWT
- ✅ Sécurisation endpoints privés (pollution POST/PUT/DELETE, users GET)
- ✅ Middleware authenticateJWT fonctionnel
- ✅ Formulaire /login fonctionnel
- ✅ Store NGXS pour token/user
- ✅ HTTP Interceptor pour Authorization header
- ✅ Guards pour protection routes
- ✅ Logout implémenté

## 🎯 Prochaines Étapes (si besoin)

- [ ] Refresh token pour renouvellement automatique
- [ ] Gestion rôles utilisateurs (admin/user)
- [ ] Protection par rôle avec guards spécifiques
- [ ] Gestion expiration token (401 → logout auto)
- [ ] Tests unitaires authentification
