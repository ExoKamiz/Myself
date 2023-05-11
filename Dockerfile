FROM alpine:3.16 AS base
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache nodejs npm
RUN npm ci --only=production

# Dependencies-only image for caching
FROM base AS dependencies
RUN npm ci

# Development image with source code
FROM dependencies AS development
ENV NODE_ENV=development
RUN npm install --only=development
COPY . .
CMD ["npm", "run", "dev"]

# Production image with source code
FROM dependencies AS production
ENV NODE_ENV=production
COPY . .
CMD ["node", "myself.js"]

# Metadata for the image
LABEL author="Maksym Zimak"
EXPOSE 8000
