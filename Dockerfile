# DOCKER-VERSION 1.2.0

FROM timbira/ubuntu-postgresql:9.2

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

# install Node
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs
RUN apt-get update

# copy Yose
COPY . /src

