FROM node:8.0.0
MAINTAINER https://github.com/r-DestinyTheGame

RUN npm install -g gulp-cli
RUN mkdir Sweeper-Bot
COPY / /root/Sweeper-Bot
WORKDIR /root/Sweeper-Bot
RUN yarn install
RUN npm link gulp
RUN gulp && mv bin/* .

ENV HOME /root/Sweeper-Bot


CMD ["node", "sweeper.js"]
