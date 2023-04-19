FROM node:16

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock .
RUN grep version package.json | sed 's|.*version...*"\(.*\)".*|REACT_APP_VERSION=\1|g' > .env
RUN npm i
COPY . .
 
# start app
CMD ["yarn", "start"]
