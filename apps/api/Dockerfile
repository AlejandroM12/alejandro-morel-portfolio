FROM node:22-bookworm-slim

WORKDIR /repo

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/config/package.json packages/config/package.json

RUN pnpm install --frozen-lockfile --filter @personal-portfolio/api...

COPY apps/api apps/api
COPY packages/config packages/config

WORKDIR /repo/apps/api

ENV DATABASE_URL=postgresql://portfolio:portfolio@postgres:5432/portfolio

RUN pnpm build

EXPOSE 3001

CMD ["sh", "-c", "pnpm db:migrate && pnpm db:seed && node dist/main.js"]
