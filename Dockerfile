# DOCKER-VERSION 1.2.0

FROM ubuntu:14.04

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update
RUN apt-get install -y nodejs npm

COPY . /src
RUN cd /src; npm install

RUN apt-get install -y postgresql-9.3
RUN sudo -i -u postgres
RUN /etc/init.d/postgresql start

# EXPOSE 5000

# CMD cd /src && nodejs app/lib/web.js

