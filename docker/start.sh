#!/bin/sh

echo "starting postgres..."
docker-entrypoint.sh postgres &
sleep 5

echo "starting node..."
node app/lib/web.js