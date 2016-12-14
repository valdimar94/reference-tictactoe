#!/bin/bash

set -e

rm -rf node_modules
npm install
cd client/
rm -rf node_modules
npm install # remove current node modules in both the root and in the client folders, and npm installing again

exit 0
