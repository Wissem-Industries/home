# Multi-stage Dockerfile optimized for Nuxt 4 on Dokploy with Bun
# Stage 1: Build stage
FROM oven/bun:1-alpine AS builder

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++ gcc libc-dev

WORKDIR /app

# Copy package files for dependency installation
COPY package.json bun.lock ./

# Install dependencies with frozen lockfile for reproducible builds
RUN bun install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Nuxt application
RUN bun run build

# Stage 2: Production runtime
FROM oven/bun:1-alpine AS runner

# Install runtime dependencies for better-sqlite3
RUN apk add --no-cache libc6-compat

# Create non-root user for security
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 nuxt

WORKDIR /app

# Copy built application and dependencies from builder
COPY --from=builder --chown=nuxt:bunjs /app/.output /app/.output
COPY --from=builder --chown=nuxt:bunjs /app/node_modules /app/node_modules
COPY --from=builder --chown=nuxt:bunjs /app/package.json /app/package.json

# Switch to non-root user
USER nuxt

# Expose port 3000 (Dokploy default)
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the Nuxt server
CMD ["node", ".output/server/index.mjs"]

