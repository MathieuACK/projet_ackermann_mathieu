# Quick Start Guide - TP07

## 🚀 Démarrage Rapide

### 1. Installation Backend

```bash
cd api
npm install
```

### 2. Configuration

Créer `.env` dans le dossier `api/` :

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=pollution_db

# JWT
JWT_SECRET=super-secret-key-min-32-characters-change-in-production
JWT_EXPIRES_IN=24h

# Server
PORT=3000
```

### 3. Initialiser la Base de Données

```bash
# Depuis le dossier api/
npm run db:migrate
npm run db:seed
```

### 4. Démarrer le Backend

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### 5. Installation Frontend

```bash
cd Front
npm install
```

### 6. Configurer l'URL de l'API

Le fichier `Front/src/environments/environment.ts` est déjà configuré :

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
};
```

### 7. Démarrer le Frontend

```bash
ng serve
```

L'application démarre sur `http://localhost:4200`

## 📝 Premier Test

### Créer un Compte

1. Aller sur `http://localhost:4200`
2. Redirection automatique vers `/login`
3. Cliquer sur "S'inscrire"
4. Remplir le formulaire :
   - Login (email) : `test@test.com`
   - Password : `test123`
   - Prénom : `Test`
   - Nom : `User`
5. Cliquer sur "S'inscrire"
6. Redirection automatique vers `/pollution/list`

### Tester les Fonctionnalités

1. **Voir les pollutions** : Liste affichée automatiquement
2. **Créer une pollution** : Cliquer sur "Nouvelle pollution"
3. **Se déconnecter** : Cliquer sur "Déconnexion"
4. **Se reconnecter** : Utiliser les mêmes identifiants

## 🔍 Vérifications

### Backend

1. **Vérifier que le serveur tourne** :

   ```bash
   curl http://localhost:3000/api/pollutions
   ```

2. **Tester la connexion** :

   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123"}'
   ```

   Réponse attendue :

   ```json
   {
     "accessToken": "eyJhbGci...",
     "user": {
       "id": "...",
       "login": "test@test.com",
       "firstname": "Test",
       "lastname": "User"
     }
   }
   ```

3. **Tester un endpoint protégé** :

   ```bash
   # Avec token (doit fonctionner)
   curl -X GET http://localhost:3000/api/users \
     -H "Authorization: Bearer VOTRE_TOKEN_ICI"

   # Sans token (doit retourner 401)
   curl -X GET http://localhost:3000/api/users
   ```

### Frontend

1. **Ouvrir la console du navigateur** (F12)
2. **Application > Local Storage**
3. Vérifier la présence de :

   - `accessToken` - Le token JWT
   - `currentUser` - Les infos utilisateur
   - `@@STATE` - Le state NGXS complet

4. **Network > Headers**
   - Créer une pollution
   - Vérifier dans les requêtes HTTP le header :
   ```
   Authorization: Bearer eyJhbGci...
   ```

## ⚠️ Problèmes Courants

### Backend ne démarre pas

**Erreur :** `Cannot find module 'jsonwebtoken'`

```bash
cd api
npm install
```

**Erreur :** Database connection failed

- Vérifier PostgreSQL est démarré
- Vérifier les credentials dans `.env`
- Créer la database si nécessaire :
  ```sql
  CREATE DATABASE pollution_db;
  ```

### Frontend ne se connecte pas

**Erreur :** `CORS error`

- Vérifier que le backend tourne
- Vérifier l'URL dans `environment.ts`

**Token invalide**

- Supprimer localStorage : F12 > Application > Clear Storage
- Vérifier que JWT_SECRET est identique entre build et runtime

### Routes non protégées

- Vérifier que `authGuard` est bien dans `app.routes.ts`
- Vérifier que `AuthState` est enregistré dans `app.config.ts`

## 🎯 Checklist Fonctionnalités

- [ ] Backend compile sans erreur (`npm run build`)
- [ ] Frontend compile sans erreur (`ng build`)
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Token est stocké dans localStorage
- [ ] Requêtes incluent le header Authorization
- [ ] Routes protégées redirigent vers /login si non connecté
- [ ] Logout supprime le token et redirige vers /login
- [ ] Persistance : rechargement de page conserve la session

## 📚 Documentation Complète

- `README.md` - Documentation générale du projet
- `IMPLEMENTATION.md` - Détails de l'implémentation JWT
- `MIGRATION.md` - Guide de migration depuis TP06

## 🆘 Support

En cas de problème :

1. Vérifier les logs console (backend et frontend)
2. Vérifier les erreurs de compilation TypeScript
3. Consulter `IMPLEMENTATION.md` pour les détails
4. Vérifier que toutes les dépendances sont installées
