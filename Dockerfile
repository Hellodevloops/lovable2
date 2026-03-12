## Single Dockerfile for frontend + backend (Node + Express + Vite)

FROM node:20-bullseye-slim AS base

WORKDIR /app

## System deps for sqlite3 native module
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

## Install frontend dependencies
COPY package.json package-lock.json* ./
RUN npm install

## Install backend dependencies (build sqlite3 against container OS)
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm install --omit=dev

## Copy full source
COPY . .

## Build React frontend
RUN npm run build

## Runtime configuration
ENV NODE_ENV=production \
    PORT=4000

WORKDIR /app/server

EXPOSE 4000

CMD ["npm", "start"]



