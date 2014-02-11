#!/bin/bash

set -e
clear

jshint app
echo "SUCCESS: jshint app"

jasmine-node app
echo "SUCCESS: jasmine-node app"
