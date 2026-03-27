# 🎓 Students API - CI/CD Project

![CI Status](https://github.com/JourdanKyllian/CICD-TP/actions/workflows/ci.yml/badge.svg)

Une API RESTful construite avec **NestJS** pour gérer une liste d'étudiants. Ce projet a été conçu dans le cadre d'un TP sur l'intégration continue (CI) et met l'accent sur la qualité du code, les tests automatisés et l'auto-documentation.

## ✨ Fonctionnalités

- **CRUD complet** : Création, lecture, modification et suppression d'étudiants (stockage en mémoire).
- **Fonctionnalités avancées** :
  - Pagination (`?page=1&limit=10`)
  - Tri dynamique (`?sort=grade&order=desc`)
  - Recherche par nom/prénom (`/students/search?q=nom`)
  - Statistiques globales (`/students/stats`)
- **Qualité & Sécurité** : 
  - Validation stricte des données (Pipes & DTOs).
  - Gestion des cas limites (email dupliqué, notes invalides, etc.).
- **CI/CD** : Pipeline GitHub Actions automatisé (Lint, Tests E2E, Coverage, Build).

---

## 🚀 Démarrage Rapide

### 1. Installation
Assurez-vous d'avoir Node.js installé (version 20 recommandée).
```bash
# Cloner le dépôt et se placer dans le dossier
cd student

# Installer les dépendances
npm install