# DOCKER-VERSION 1.2.0

FROM ubuntu:14.04

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update
RUN apt-get install nodejs npm

COPY . /src

