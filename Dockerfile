# DOCKER-VERSION 1.2.0

FROM ubuntu:14.04

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update

# install Node.js
RUN apt-get install -y nodejs npm

# install Postgresql
RUN apt-get install -y postgresql-9.3

# install Yose
COPY . /src
RUN cd /src; npm install

# run
RUN /etc/init.d/postgresql start
RUN sudo -u postgres -i ; cd /src/scritps ; psql < create_user_and_database.sql ; psql < create_tables.sql ; exit

# EXPOSE 5000
# ENV DATABASE_URL=postgres://root@localhost
# RUN cd /src ; nodejs app/lib/web.js

