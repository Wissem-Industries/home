# ---------- Build ----------
FROM oven/bun:1-alpine AS build
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json bun.lock* ./

# Install deps
RUN bun install

# Copie du reste du projet
COPY . .

# Build Nuxt (Nitro)
RUN bun --bun run build

# ---------- Runtime ----------
FROM oven/bun:1-alpine AS production
WORKDIR /app

# On ne garde que le build Nitro
COPY --from=build /app/.output ./.output

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Lancer le serveur Nitro avec Bun
CMD ["bun", "--bun", ".output/server/index.mjs"]
