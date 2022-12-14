# Feature Management - Customized Unleash
Feature toggles make it easy to test how your code works with real production data without the fear that you'll accidentally break your users' experience. It also helps your team work on multiple features in parallel without each maintaining an separate feature branch.

## What changes I made?

The open source version does not have few features. I have created services and added extra features to make this product a fully 
deployable one and use it on the fly

## Get started in 2 steps

install PostGreSQL 14 and then 

```bash
npm install
npm run build 
npm run start:dev
```
## Docker 

Fell free to change the image and container name 

```bash

docker build . -t asok/unleash --no-cache 

docker run  --name=asok-unleash -p 4242:4242 --env=DATABASE_SSL=false --env=DATABASE_USERNAME=unleash_user --env=DATABASE_HOST=10.0.0.8 --env=DATABASE_NAME=unleash --env=DATABASE_PASSWORD=passord --env=AUTH_USER=admin --env=AUTH_PASSWORD=asok asok/unleash:latest 

```
