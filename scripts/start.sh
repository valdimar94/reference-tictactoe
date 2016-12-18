#!/bin/bash

# This file runs both migratedb and run.js which is neccessary
# When docker-compose up is run and produces an error, this script will exit
# the sleep command is neccessary at the moment so the server has time to start before trying to connect

set -e

sleep 10 # this needs to be removed in future version!
npm run migratedb # so the server updates between other browsers on localhost
node run.js # use node to run run.js

exit 0
