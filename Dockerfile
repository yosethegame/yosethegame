# DOCKER-VERSION 1.2.0

FROM ubuntu:14.04

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update
RUN apt-get install -y nodejs npm

COPY . /src
RUN cd /src; npm install

EXPOSE 5000

RUN cd /src; nodejs app/lib/web.js

