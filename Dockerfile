FROM node:16 as build

WORKDIR /app

COPY package*.json /app/
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build --ignore-scripts

FROM nginx:1.19.6-alpine
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html

COPY env.global.tmp.js /app/env.global.tmp.js
COPY package.json /app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /app/entrypoint.sh

EXPOSE 80

CMD ["sh", "/app/entrypoint.sh"]
