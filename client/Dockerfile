FROM node:9.5-alpine

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install --only=production
COPY . /usr/src/app

ENV HOST 0.0.0.0
EXPOSE 3000

RUN npm run build
CMD [ "npm", "start" ]
