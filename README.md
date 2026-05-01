# ft_transcendence - Wextetris

## 0. TODO
- Mode Dev VS mode Prod de NodeJS



### 1. Vision

- Projet : **WexTetris**
- Objectif : site web Tetris multijoueur avec rooms, comptes utilisateurs, scores persistés, leaderboard, API DB et monitoring.

### 2. Objectif MVP 14 Points

Checklist modules à viser :

- [x] **Major Web** - Framework frontend + backend : React + Express.
- [x] **Major Web** - Temps réel avec WebSockets.
- [ ] **Major Game** - Jeu web complet jouable dans le navigateur.
- [ ] **Major Game** - Deux joueurs remote sur deux machines/navigateurs.
- [ ] **Major Web** - API publique DB sécurisée avec clé API, rate limit, documentation et 5 endpoints minimum.
- [x] **Major DevOps** - Prometheus/Grafana avec exporters, dashboard, alertes et accès sécurisé.
- [ ] **Minor User** - Game statistics + match history.
- [ ] **Minor i18n** - Traduction complète en au moins 3 langues.
- [ ] **Minor Web** - Design system complet 10 composants : icones, typographie, palette


Total visé : **15 points**.

### 3. Checklist Obligatoire Sujet

- [x] Frontend, backend et database présents.
- [x] Projet lançable avec une commande (`make up` ou équivalent).
- [x] `.env` ignoré par Git et `.env.example` maintenu.
- [ ] Auth email/password sécurisée : hash + salt.
- [ ] Validation des inputs côté frontend et backend.
- [ ] Multi-utilisateurs simultanés sans corruption d’état.
- [ ] Backend accessible en HTTPS pour la version finale.
- [ ] Pages Privacy Policy et Terms of Service accessibles.
- [ ] Aucun warning/erreur bloquant dans la console Chrome.
- [ ] README final avec architecture, DB schema, modules, points et contributions.

### 4. Branches À Consolider

- `master` : base actuelle.
- ~~`origin/seb/gamefix` : Tetris fonctionnel, rooms/game state, score list. À intégrer en priorité.~~
- ~~`origin/features/backend/api` : API DB à reprendre, à sécuriser et adapter au backend final.~~
- ~~`origin/feature/devops-monitoring` : Prometheus/Grafana déjà prêt, à rebaser après stabilisation backend/DB.~~
- ~~`origin/components` : composants UI et structure frontend, à intégrer après gameplay/routes.~~
- ~~`origin/game_rooms` : ancienne branche, à utiliser seulement pour cherry-pick ciblé si nécessaire ou à supprimer~~

## Roadmap Par Milestone

### Milestone 0 - Intégration Propre

- [x] Intégrer `origin/seb/gamefix`.
- [ ] Résoudre les conflits gameplay/WebSocket.
- [x] Vérifier que `make up` lance frontend/backend/database.

### Milestone 1 - Tetris Présentable

- [x] Tetris jouable dans la page Game.
- [x] Création/rejoindre une room fonctionnelle.
- [x] Deux joueurs peuvent jouer dans la même partie.
- [x] Synchronisation stable entre clients.
- [x] Gestion minimale des déconnexions/reconnexions.
- [ ] Score visible pendant/après la partie.
- [ ] Page Game propre avec canvas + tableau des joueurs/scores.

### Milestone 2 - Auth, DB Et Scores

- [ ] Page Register.
- [ ] Page Login.
- [ ] Hash/salt des mots de passe côté backend.
- [ ] Connexion backend vers PostgreSQL.
- [ ] Sauvegarde des players.
- [ ] Sauvegarde des games/scores.
- [ ] Leaderboard simple.
- [ ] Historique des parties par joueur.
- [ ] Validation backend de tous les inputs critiques.

### Milestone 3 - API Publique DB

- [x] Préfixe API clair : `/api`.
- [ ] Clé API obligatoire.
- [ ] Rate limiting.
- [ ] Documentation courte dans README.
- [x] Minimum 5 endpoints couvrant GET, POST, PUT, DELETE.
- [ ] Endpoints recommandés : players, games, scores, leaderboard, themes/friends.
- [ ] Réponses JSON cohérentes avec codes HTTP propres.

### Milestone 4 - Frontend Présentable

- [ ] Intégrer la branche `components` sans casser le gameplay.
- [ ] Pages minimales : Home, Login, Register, Room, Game, Leaderboard, Profile.
- [ ] Ajouter Privacy Policy.
- [ ] Ajouter Terms of Service.
- [ ] Traduire tous les textes visibles.
- [ ] Ajouter une 3e langue.
- [ ] Vérifier responsive desktop/mobile.
- [ ] Nettoyer les logs/debug visibles.

### Milestone 5 - Monitoring Et Finalisation

- [x] Rebaser/intégrer `feature/devops-monitoring`.
- [x] Adapter les requêtes postgres-exporter au schéma DB final.
- [x] Prometheus scrape backend `/metrics`.
- [x] Prometheus scrape API `/metrics`.
- [x] Prometheus scrape PostgreSQL via postgres-exporter.
- [x] Blackbox exporter vérifie frontend/backend/API/Grafana.
- [x] Dashboard Grafana chargé automatiquement au démarrage.
- [x] Alertes Grafana/Prometheus présentes.
- [x] Accès Grafana protégé par variables `.env`.
- [x] Documenter URL Grafana/Prometheus dans README.

#### Accès monitoring

- Grafana : `http://localhost:3002`
- Prometheus : `http://localhost:9090`
- Identifiants Grafana par défaut : `GRAFANA_ADMIN_USER` / `GRAFANA_ADMIN_PASSWORD` dans `.env.example`.
- Logs monitoring : `make monitor-logs`.

## Stretch Non Prioritaire

À ne faire qu’après MVP stable :

- [ ] Multiplayer 3+.
- [ ] Game customization avancée.
- [ ] User interactions avancées : chat, friends complet, profils riches.
- [ ] Multi-navigateurs.
- [ ] Backend microservices.


