# HSL live activity demo

## Plan

Utilize [HSL realtime positional data]() to display vehicle positioning in a map. User should be able to position a rectangle within the vehicles are tracked. 

## Stack

UI: react based UI. react-query along with orval to generater API layer from openAPI. playwright for unit/e2e testing. 

Server: prisma (postgresql) for database management. 

Deployed as docker image.

## Architecture

```plantuml
bob-->alice
```

## Todo

- add UI e2e tests
- add UI unit tests
- send updates to clients via Websocket instead of polling 

## Local environment setup

- Node => 18.13.0
- pnpm (`npm i -g pnpm`)
- enable typescript compiler in IDE (`tsconfig.json`)
- enable eslint in IDE (`.eslintrc.js`)
- postgres with user/pass in .env