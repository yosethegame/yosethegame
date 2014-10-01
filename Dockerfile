# DOCKER-VERSION 1.2.0

FROM fike/ubuntu-postgresql:9.2

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

install Node.js
RUN apt-get install -y nodejs npm

# install Yose
COPY . /src
RUN cd /src; npm install
EXPOSE 5000 
ENV DATABASE_URL=postgres://root@localhost

