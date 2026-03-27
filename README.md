# Students API - CI/CD Project

![CI Status](https://github.com/JourdanKyllian/CICD-TP/actions/workflows/ci.yml/badge.svg)

Une API RESTful construite avec **NestJS** pour gérer une liste d'étudiants. Ce projet a été conçu dans le cadre d'un TP sur l'intégration continue (CI) et met l'accent sur la qualité du code, les tests automatisés et l'auto-documentation.

> Pipeline CI/CD complet,
> 
> **25 tests E2E** (incluant cas limites et requêtes vides),
> 
> **Couverture de code (coverage)** exportée en artefact sur GitHub,
> 
> Documentation **Swagger** interactive.

## Fonctionnalités

- **CRUD complet** : Création, lecture, modification et suppression d'étudiants (stockage en mémoire).
- **Fonctionnalités avancées** :
  - Pagination (`?page=1&limit=10`)
  - Tri dynamique (`?sort=grade&order=desc`)
  - Recherche par nom/prénom (`/students/search?q=nom`)
  - Statistiques globales (`/students/stats`)
- **Qualité & Sécurité** : 
  - Validation stricte des données (Pipes & DTOs).
  - Gestion des cas limites (email dupliqué, notes invalides, IDs inexistants).
- **CI/CD** : Pipeline GitHub Actions automatisé (Lint, Tests E2E, Coverage, Build).

---

## Démarrage Rapide

### 1. Installation
Assurez-vous d'avoir Node.js installé (version 20 recommandée).
```
# Cloner le dépôt et se placer dans le dossier
cd student

# Installer les dépendances
npm install
```

### 2. Lancer le serveur
```
# Lancement en mode développement
npm run start:dev
```
L'API sera accessible sur http://localhost:3000.

### 3. Documentation API (Swagger)

L'API est entièrement documentée via Swagger UI. Une fois le serveur lancé, vous pouvez consulter les routes, voir les schémas de données et tester les requêtes (Tris, Pagination, CRUD) directement depuis votre navigateur.

Accéder au Swagger : http://localhost:3000/api

### 4. Tests & Couverture de Code (Coverage)
Ce projet est couvert par une suite robuste de 25 tests automatisés (E2E) pour garantir la fiabilité de l'API sans base de données.

Rapport de Couverture : Le calcul du coverage est automatisé. À chaque push, le pipeline GitHub Actions génère un rapport de couverture complet disponible en téléchargement sous forme d'artefact dans l'onglet Actions.

---

Commandes locales :
```
# Lancer l'analyse de syntaxe (ESLint)
npm run lint

# Lancer la suite des 25 tests E2E
npm run test:e2e

# Mesurer la couverture de code localement
npm run test:cov
```
