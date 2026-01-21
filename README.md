# TP07 - Authentification JWT (Login/Logout et Sécurisation)

**Auteur:** Mathieu ACKERMANN  
**Formation:** CNAM - SI Web

## 📋 Description

Application de gestion de pollutions avec authentification JWT complète :

- Backend Node.js/Express avec génération et vérification de tokens JWT
- Frontend Angular avec NGXS (Redux) pour la gestion d'état
- Sécurisation des endpoints et routes protégées

## 🔐 Fonctionnalités d'Authentification

### Backend (API)

- ✅ Endpoint `/api/auth/login` - Connexion avec JWT
- ✅ Endpoint `/api/auth/register` - Inscription avec mot de passe hashé (bcrypt)
- ✅ Middleware `authenticateJWT` pour sécuriser les routes privées
- ✅ Protection des endpoints :
  - `POST /api/pollutions` - Créer une pollution (protégé)
  - `PUT /api/pollutions/:id` - Modifier une pollution (protégé)
  - `DELETE /api/pollutions/:id` - Supprimer une pollution (protégé)
  - `GET /api/users` - Liste des utilisateurs (protégé)

### Frontend (Angular)

- ✅ Page de connexion `/login` avec formulaire email/password
- ✅ NGXS State pour gérer le token JWT et l'utilisateur connecté
- ✅ HTTP Interceptor qui injecte automatiquement le header `Authorization: Bearer <token>`
- ✅ Auth Guard pour protéger les routes nécessitant une authentification
- ✅ Bouton Logout avec redirection vers `/login`
- ✅ Persistance du token dans localStorage

## 🚀 Installation

### Prérequis

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### Backend (API)

```bash
cd api
npm install
```

Créer un fichier `.env` (voir `.env.example`) :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=pollution_db

JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRES_IN=24h

PORT=3000
```

Initialiser la base de données :

```bash
npm run db:migrate
npm run db:seed
```

Démarrer le serveur :

```bash
npm run dev
```

### Frontend (Angular)

```bash
cd Front
npm install
```

Configurer l'URL de l'API dans `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
};
```

Démarrer l'application :

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 📡 API Endpoints

### Publics

- `POST /api/auth/login` - Connexion

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  Réponse :

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "login": "user@example.com",
      "firstname": "John",
      "lastname": "Doe"
    }
  }
  ```

- `POST /api/auth/register` - Inscription
- `GET /api/pollutions` - Liste des pollutions
- `GET /api/pollutions/:id` - Détail d'une pollution

### Privés (Nécessitent `Authorization: Bearer <token>`)

- `POST /api/pollutions` - Créer une pollution
- `PUT /api/pollutions/:id` - Modifier une pollution
- `DELETE /api/pollutions/:id` - Supprimer une pollution
- `GET /api/users` - Liste des utilisateurs

## 🔒 Sécurité

- Mots de passe hashés avec bcryptjs (10 rounds)
- Tokens JWT signés avec secret configurable
- Expiration des tokens configurable (défaut 24h)
- Validation des tokens sur chaque requête protégée
- Headers CORS configurés

## 🧪 Test de l'Authentification

1. **Créer un compte** : Aller sur `/login` et cliquer sur "S'inscrire"
2. **Se connecter** : Utiliser les identifiants créés
3. **Accéder aux routes protégées** : Naviguer vers `/pollution/list`
4. **Tester les endpoints protégés** : Créer/modifier une pollution
5. **Se déconnecter** : Cliquer sur le bouton "Déconnexion"

## 📦 Technologies Utilisées

### Backend

- Node.js / Express
- TypeScript
- Sequelize (ORM)
- PostgreSQL
- jsonwebtoken (JWT)
- bcryptjs (Hachage de mots de passe)

### Frontend

- Angular 19
- NGXS (State Management)
- RxJS
- TypeScript
- Bootstrap (UI)

## 🌐 Déploiement

L'application est déployée sur Render :

- **Frontend** : [URL à compléter]
- **Backend** : [URL à compléter]

## 📝 Livrables

- ✅ Repository GitHub : `tp07_ackermann_mathieu`
- ✅ Branche principale : `main`
- ✅ Dossiers : `Front/` et `api/`
- ✅ Application déployée sur Render

## 👨‍💻 Auteur

**Mathieu ACKERMANN**  
CNAM - SI Web - S1
