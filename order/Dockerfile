#-- Build
FROM node:8-alpine
LABEL maintainer="naufal_yahaya@hotmail.com"

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3000

CMD npm start