#!/bin/bash

set -e
clear

jshint public --exclude public/lib
echo "SUCCESS: jshint public --exclude public/lib"

jasmine-node test
echo "SUCCESS: jasmine-node test"

jasmine-node deployment
echo "SUCCESS: jasmine-node deployment"
