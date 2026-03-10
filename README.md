# Portfolio Wissem

Portfolio personnel construit avec `Nuxt 4`, `Nuxt UI` et runtime `Bun`.

## Stack technique

- `Nuxt 4` + `Nitro` (`preset: bun`)
- `Bun` pour le dev, build et run
- `Nuxt UI` pour les composants
- `motion-v` pour les animations
- `@nuxtjs/plausible` pour l’analytics
- Contenu piloté en YAML (`locales/`)

## Fonctionnalités

- Pages: `/`, `/projects`, `/contact`
- SEO avec canonical, Open Graph, sitemap et robots
- Formulaire de contact avec validation + rate limiting + notification Telegram
- Contenu entièrement centralisé dans l’i18n YAML (pas de texte métier en dur dans le code)

## Structure du contenu (i18n)

```text
locales/
  fr/
    content/
      index.yml      # UI globale + home + projects + CV
      contact.yml    # Page contact + labels formulaire + messages API
    projects/
      *.yml          # Fiches projets
```

Le chargement du contenu est fait au runtime via `nuxt.config.ts` et injecté dans `appConfig.siteContent`.

## Prérequis

- `Bun` installé (version récente)
- Optionnel: Docker / Docker Compose

## Installation

```bash
bun install
cp .env.example .env
```

## Variables d’environnement

Configuration minimale dans `.env`:

```env
# URL publique du site (canonical, sitemap, robots)
SITE_URL=https://example.com

# Port exposé en docker-compose
APP_PORT=3000

# Telegram (contact API)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Plausible (optionnel)
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=
NUXT_PUBLIC_PLAUSIBLE_API_HOST=
```

## Commandes (Bun only)

```bash
# Développement
bun run dev

# Qualité
bun run lint
bun run lint:fix
bun run typecheck

# Production
bun run build
bun run preview
bun run start
```

## Développement local

Lancer en local:

```bash
bun run dev
```

Application disponible sur `http://localhost:3000`.

## Déploiement Docker

```bash
docker compose up -d --build
```

Le conteneur utilise `oven/bun` en multi-stage et exécute `.output/server/index.mjs` avec Bun.

## Checklist avant production

- `bun run lint` passe sans erreur
- `bun run typecheck` passe sans erreur
- `bun run build` passe sur l’environnement cible
- Variables `.env` renseignées (`SITE_URL`, Telegram, Plausible si utilisé)
- Vérifier le contenu i18n (`locales/fr/...`) avant release

---

Si tu ajoutes une nouvelle langue, duplique `locales/fr` puis adapte les champs YAML à l’identique.
