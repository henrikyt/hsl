# to simpplify, let's only have one server
FROM guergeiro/pnpm:18-8 as builder

WORKDIR /ui_build
COPY ./ui/package.json ./ui/pnpm-lock.yaml ./
RUN pnpm i
COPY ./ui .
RUN pnpm dist

WORKDIR /server_build
COPY ./server/package.json ./server/pnpm-lock.yaml ./
RUN pnpm i
COPY ./server/prisma ./
RUN pnpx prisma generate
COPY ./server .
RUN pnpm dist

FROM guergeiro/pnpm:18-8

WORKDIR /app
ENV NODE_ENV production

COPY ./server/package.json ./server/pnpm-lock.yaml ./
RUN pnpm i --prod

COPY --from=builder /server_build/prisma ./prisma
COPY --from=builder /server_build/.env .
RUN pnpx prisma generate
RUN pnpx prisma migrate dev --name up

COPY --from=builder /server_build/out .
COPY --from=builder /ui_build/dist ./public

EXPOSE 3500
EXPOSE 8883

CMD ["node", "app.js"]
