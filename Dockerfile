FROM node:16

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock .
RUN yarn install
COPY . .
 
# start app
CMD ["yarn", "start"]
