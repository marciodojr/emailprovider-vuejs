FROM node:10.12.0

COPY .  /srv/vhosts/app

WORKDIR /srv/vhosts/app

RUN npm install && npx vue-cli-service build --mode=development

FROM nginx:1.15.5-alpine

COPY --from=0 /srv/vhosts/app/dist /srv/vhosts/app

COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf