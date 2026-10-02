# syntax=docker/dockerfile:1.7
FROM oven/bun:1.4.2-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
COPY .npmrc ./
RUN --mount=type=secret,id=github_packages_token,required=true \
    printf '//npm.pkg.github.com/:_authToken=%s\n' "$(cat /run/secrets/github_packages_token)" > /root/.npmrc && \
    bun install --frozen-lockfile && \
    rm -f /root/.npmrc

FROM base AS build
ARG IMAGE_VERSION=dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Theme and language cookies shared with the other wissem.pro sites (Wissem UI).
ARG WSM_COOKIE_DOMAIN=.wissem.pro
RUN bun run build

FROM oven/bun:1.4.2-alpine AS runtime
ARG IMAGE_VERSION=dev
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=build --chown=bun:bun /app/.output ./.output
LABEL org.opencontainers.image.title="Wissem Home" \
      org.opencontainers.image.description="Personal portfolio of Wissem Badraoui, built with Nuxt and Wissem UI" \
      org.opencontainers.image.source="https://github.com/Wissem-Industries/Wissem-Home" \
      org.opencontainers.image.url="https://www.wissem.pro" \
      org.opencontainers.image.version=$IMAGE_VERSION

USER bun
EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]
