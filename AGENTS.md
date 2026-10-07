# Wissem Home — consignes de projet

Wissem Home est le portfolio public de Wissem’s Industries, actuellement en génération produit V3, servi sur `www.wissem.pro`.

## Produit et contenu

- Le site présente le profil, les projets, l’expérience, la formation et le contact, en français et en anglais sur les routes canoniques partagées.
- Utiliser `@wissem-industries/ui` comme Nuxt Layer et conserver les pages et la logique métier du produit dans ce dépôt.
- Le formulaire transmet les demandes à Telegram seulement lorsque les variables serveur sont configurées. Sans ces variables, l’API indique l’indisponibilité et ne stocke pas les messages.
- Les images de projets sont locales (aucune image distante) et servies par `@nuxt/image`. Les produits en ligne sont capturés par `bun run images:screenshots` (à lancer en local, les sites ne sont pas joignables depuis le cloud) ; les projets confidentiels ou sans interface publique utilisent les couvertures de `bun run images:covers`, sans contenu interne.
- Les images de partage 1200×630 (`public/images/og-fr.png`, `og-en.png`) sont générées par `bun run images:og` à partir du contenu du site ; les relancer quand le statut ou l'intitulé change.
- L'en-tête, le bouton de thème, le sélecteur de langue, les apparitions (`v-reveal`) et les fonds viennent de Wissem UI : ne pas les recréer ici. Le français est à la racine, l'anglais sous `/en` ; l'affichage de la carte « stage recherché » dépend du seul booléen `SEEKING_INTERNSHIP` (`shared/content/index.ts`).
- Plausible est optionnel et configurable. Ne pas ajouter de suivi tiers non demandé.
- Les pages `/legal` et `/privacy` (contenus `legal` et `privacy` de `shared/content`) décrivent les traitements réels : les mettre à jour à chaque nouvel outil tiers, nouveau champ de formulaire, nouveau cookie ou changement d’hébergeur, et changer la date « Dernière mise à jour ».
- `V3` désigne la génération du produit, pas une version : les versions SemVer repartent de `1.0.0` (octobre 2026). Versions : CHANGELOG tenu à chaque PR (section `Unreleased`), montée par `bun run release <x.y.z>`.
- Les branches `archive/v1` et `archive/v2` préservent l’ancien historique. Ne pas réécrire, déplacer ou supprimer leurs refs.

## Stack et livraison

- Nuxt 4, Vue 3, TypeScript, Bun 1.4.x, Biome 2 et `@wissem-industries/ui`. Installer avec `bun install --frozen-lockfile`; utiliser `bun run check` avant une livraison pertinente.
- Le contact utilise les variables `NUXT_TELEGRAM_BOT_TOKEN` et `NUXT_TELEGRAM_CHAT_ID`; Plausible utilise ses variables publiques documentées dans `.env.example`. Ne jamais copier de valeurs réelles dans Git ou les logs.
- Woodpecker vérifie push/PR. Les tags `v*` alignés sur `package.json.version` publient l’image GHCR et déclenchent le webhook Dokploy.
- Garder les images Alpine et les étapes CI Bun selon les consignes communes de Wissem's Industries.
- Mettre à jour ce fichier automatiquement pour chaque nouvelle règle durable de Wissem Home; reporter les règles transverses au dépôt central.
