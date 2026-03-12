## Single Dockerfile for frontend + backend (Node + Express + Vite)

FROM node:20-alpine AS base

WORKDIR /app

## Install frontend dependencies
COPY package.json package-lock.json* ./
RUN npm install

## Install backend dependencies
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


