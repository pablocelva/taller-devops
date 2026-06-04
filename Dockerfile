FROM node:24

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install
RUN pnpm test
RUN pnpm lint
RUN pnpm build

EXPOSE 80

CMD ["pnpm", "run", "preview", "--host", "0.0.0.0", "--port", "80"]