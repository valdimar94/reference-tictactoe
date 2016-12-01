#!/bin/bash

set -e

sleep 10 #this needs to be removed in future version!
npm run migratedb
node run.js

exit 0
