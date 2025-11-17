<div align="center">
  <img src="./public/wissem.svg" alt="Logo" width="120" height="120">
  <h1>HomePage</h1>
  <p>Page d'accueil moderne multilingue avec effets typewriter</p>

  ![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
</div>

## 📋 Table des matières

- [À propos](#-à-propos)
- [Stack technique](#-stack-technique)
- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Scripts disponibles](#-scripts-disponibles)
- [Structure du projet](#-structure-du-projet)
- [Internationalisation](#-internationalisation)

## 🎯 À propos

Application Vue 3 moderne servant de page d'accueil interactive avec support multilingue (FR/EN/ES) et effets d'animation typewriter. Construite avec les dernières technologies front-end et prête pour l'intégration d'animations WebGL avancées.

## 🛠 Stack technique

| Technologie | Usage |
|-------------|-------|
| **Vue 3** | Framework UI avec Composition API |
| **TypeScript** | Typage statique et meilleure DX |
| **Vite** | Build tool ultra-rapide avec HMR |
| **SCSS** | Préprocesseur CSS |

## ✨ Fonctionnalités

- 🌍 **Multilingue** : Support FR / EN / ES avec switch automatique
- ⌨️ **Effet typewriter** : Animation d'écriture/effacement fluide
- 🎨 **Design moderne** : Interface stylée avec Tailwind CSS
- 🚀 **Performance** : Build optimisé et tree-shaking automatique
- 📱 **Responsive** : Adaptation mobile/desktop
- ♿ **Accessible** : Structure sémantique et navigation au clavier

## 📦 Installation

```bash
# Cloner le dépôt
git clone <repository-url>

# Installer les dépendances
npm install
```

**Prérequis :**
- Node.js 18+ (20 LTS recommandé)
- npm 9+

## 🚀 Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── Base.vue              # Layout de base
│   ├── Home.vue              # Composant page d'accueil
│   └── Buttons.vue           # Composants boutons
├── languages/
│   ├── fr_FR.ts              # Traductions françaises
│   ├── en_US.ts              # Traductions anglaises
│   └── es_ES.ts              # Traductions espagnoles
├── misc/
│   └── useLanguageSwitcher.ts # Hook de gestion i18n
├── App.vue                   # Composant racine
├── main.ts                   # Point d'entrée
└── style.scss                # Styles globaux
```

## 🌐 Internationalisation

Le système i18n est géré via un composable custom `useLanguageSwitcher` qui offre :

- **Alternance automatique** : Changement de langue toutes les 10 secondes
- **Effet typewriter synchronisé** : Animation d'écriture lettre par lettre
- **Gestion mémoire propre** : Cleanup automatique des timers

### Ajouter une nouvelle langue

1. Créer un fichier `xx_XX.ts` dans `src/languages/` :

```typescript
export const langXX: Language = {
  welcome: "...",
  name: "...",
  construction: "...",
  button: "..."
};
```

2. L'importer et l'ajouter au tableau dans `useLanguageSwitcher.ts`


---

<div align="center">
  Made with 💖 by <a href="https://www.wissem.pro/">Wissem.</a>
</div>
