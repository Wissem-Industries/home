# syntax=docker/dockerfile:1.7

# ---------- Build ----------
FROM --platform=$BUILDPLATFORM oven/bun:1-alpine AS base
WORKDIR /app

# ---------- Install deps ----------
FROM base AS deps

# Copie des fichiers de dépendances
COPY package.json bun.lock* ./

# Install deps (cache bun store for faster Docker builds)
RUN --mount=type=cache,target=/root/.bun \
        bun install --frozen-lockfile --ignore-scripts

# ---------- Build ----------
FROM base AS build

# Reuse install layer and project files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Nuxt (Nitro)
RUN bun run build

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
