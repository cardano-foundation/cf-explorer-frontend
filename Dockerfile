FROM node:16 as build

WORKDIR /app

COPY package*.json /app/
RUN grep version package.json | sed 's|.*version...*"\(.*\)".*|REACT_APP_VERSION=\1|g' > .env
RUN npm i
COPY . .

RUN yarn build


FROM nginx:1.19.6-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]





