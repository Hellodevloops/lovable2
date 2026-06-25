## Single Dockerfile for frontend + backend (Node + Express + Vite)

FROM node:20-bullseye-slim AS frontend-builder

WORKDIR /app

## Install all deps (including vite) even when NODE_ENV=production in CI/CD
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM node:20-bullseye-slim AS base

WORKDIR /app

## System deps for sqlite3 native module
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm ci --omit=dev

COPY server ./server
COPY --from=frontend-builder /app/dist ./dist

ENV NODE_ENV=production \
    PORT=4000

WORKDIR /app/server

EXPOSE 4000

CMD ["npm", "start"]
