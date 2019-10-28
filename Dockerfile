FROM mhart/alpine-node:12.6.0
MAINTAINER Sergiy Zablotskiy <sergiy@slatestudio.com>

ENV HOME /src
RUN mkdir -p $HOME
WORKDIR $HOME


RUN npm init --yes
RUN npm install --no-save nodecredstash


RUN rm -rf $HOME/node_modules
RUN rm -f $HOME/package*.json

COPY . $HOME/
RUN npm clean-install --no-optional --production --silent

EXPOSE 3000

ENTRYPOINT npm start
