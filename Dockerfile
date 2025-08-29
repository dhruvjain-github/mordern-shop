# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /app
COPY package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/data ./data
EXPOSE 3000
CMD ["node", "server.js"]
