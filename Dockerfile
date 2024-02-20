# to simpplify, let's only have one server
FROM guergeiro/pnpm:18-8 as builder

WORKDIR /ui_build
COPY ./ui/package.json ./ui/pnpm-lock.yaml ./
RUN pnpm i
COPY ./ui .
RUN pnpm dist

WORKDIR /server_build
COPY ./server/package.json ./server/pnpm-lock.yaml ./
COPY ./server/prisma ./
RUN pnpm i
RUN pnpx prisma generate
COPY ./server .
RUN pnpm dist

FROM guergeiro/pnpm:18-8

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /server_build/prisma ./prisma
COPY ./server/package.json ./server/pnpm-lock.yaml ./
RUN pnpm i --prod
RUN pnpx prisma generate

COPY --from=builder /server_build/out .
COPY --from=builder /ui_build/dist ./public

EXPOSE 3500
EXPOSE 8883

CMD ["pnpm", "prod"]
