# HSL live activity demo

[DEMO](https://hsl.ubi.dynu.com/)

## Plan

Utilize [HSL realtime positional data]() to display vehicle positioning in a map. User should be able to position a rectangle within the vehicles are tracked.

## Stack

UI: **react** based UI. **react-query** along with **orval** to generate API layer from openAPI. **playwright** for unit/e2e testing. 

Server: **prisma** (postgresql) for database management. **fastify** as server middleware. **mqtt** to communicate with HSL. **tap** for unit testing.

Deployed as **docker** image.

## Architecture

Components

```plantuml
node ui
node server
database db
cloud hsl

server <.. hsl :mqtt
server ..> ui : ws
server <- ui : http
server -> db 
```

Sequence

```plantuml
participant ui
participant server
database db
participant hsl

ui->server : get session token
db<-server : update session token
ui<-server : ok
ui->server : get session
db<-server : get session
db->server : session
ui<-server : prev/cur session data
ui->server : get vehicles
db<->server : get vehicles
hsl<-server : subscribe
ui<-server : vehicles
...
hsl-->server : real time vehicle data
ui<--server : real time vehicle data
```

## Todo

- add UI e2e tests
- add UI unit tests
- send updates to clients via Websocket instead of polling 

## Local environment setup

- Node => 18.13.0
- pnpm (`npm i -g pnpm`)
- update dev variables to .env