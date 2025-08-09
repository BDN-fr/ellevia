FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY pnpm-lock.yaml .
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm prune --production

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]