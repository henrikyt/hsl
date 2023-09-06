# to simpplify, let's only have one server
FROM guergeiro/pnpm:18-8 as builder
WORKDIR /ui_build
COPY ./ui .
RUN pnpm i
RUN pnpm dist

WORKDIR /server_build
COPY ./server .
RUN pnpm i
COPY ./server/prisma prisma
RUN pnpx prisma generate
RUN pnpm dist

FROM guergeiro/pnpm:18-8
WORKDIR /app
ENV NODE_ENV production

COPY ./server/package.json ./server/pnpm-lock.yaml ./
RUN pnpm i --prod

COPY --from=builder /server_build/out .
COPY --from=builder /ui_build/dist ./public
COPY --from=builder /server_build/prisma ./prisma
RUN pnpx prisma generate

EXPOSE 3000

CMD ["node" "app.js"]
