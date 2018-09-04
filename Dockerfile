FROM postgres
ENV DATABASE_URL=postgresql://postgres@localhost/postgres

MAINTAINER Eric Mignot <eric.mignot@gmail.com>

RUN apt-get update && apt-get install -y curl sudo

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

COPY database.init.sql /docker-entrypoint-initdb.d/database.init.sql
COPY app /yose/app
COPY node_modules /yose/node_modules
COPY start.sh /yose/start.sh

EXPOSE 5000
WORKDIR /yose

ENTRYPOINT ["/yose/start.sh"]
