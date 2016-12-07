#!/bin/bash/

set -e

git clean -dfx
git stash
rm -rf node_modules
npm install
cd client/
rm -rf node_modules
npm install
cd ..
./pack.sh

exit 0
