# DOCKER-VERSION 1.2.0

FROM ubuntu:14.04

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update

# Postgresql
RUN apt-get install -y postgresql-9.3
RUN /etc/init.d/postgresql start

# Node.js
RUN apt-get install -y nodejs npm

# Yose
COPY . /src
RUN cd /src; npm install
USER postgres
RUN cd /src/scritps ; psql < create_user_and_database.sql ; psql < create_tables.sql
USER root

# EXPOSE 5000
# ENV DATABASE_URL=postgres://root@localhost
# RUN cd /src ; nodejs app/lib/web.js

