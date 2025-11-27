# syntax=docker/dockerfile:1.7

# ---------- Build base ----------
FROM --platform=$BUILDPLATFORM oven/bun:1-alpine AS base
WORKDIR /app

# ---------- Deps ----------
FROM base AS deps

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun \
    bun install --ignore-scripts

# ---------- Build ----------
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# ---------- Runtime ----------
FROM oven/bun:1-alpine AS production
WORKDIR /app

COPY --from=build /app/.output ./.output

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "--bun", ".output/server/index.mjs"]
