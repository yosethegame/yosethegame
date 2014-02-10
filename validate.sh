#!/bin/bash

set -e
clear

jshint app --exclude app/lib/bootstrap --exclude app/lib/jquery
echo "SUCCESS: jshint app"

jasmine-node app
echo "SUCCESS: jasmine-node app"

jasmine-node spec
echo "SUCCESS: jasmine-node spec"
