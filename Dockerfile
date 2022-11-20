ARG NODE_VERSION=16-alpine

FROM node:$NODE_VERSION 

WORKDIR /unleash

COPY . /unleash

RUN yarn install --frozen-lockfile --ignore-scripts  && yarn run build && yarn run local:package

# RUN yarn install --frozen-lockfile

# FROM node:$NODE_VERSION as builder

WORKDIR /unleash/frontend

RUN yarn install --frozen-lockfile

WORKDIR /unleash

RUN yarn config set network-timeout 300000

# RUN mv frontend/build_copy build
# RUN mv dist_copy distcd 

EXPOSE 4242

# USER node

CMD ["node", "./dist/server.js"]