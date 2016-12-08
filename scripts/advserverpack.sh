#!/bin/bash

set -e

git clean -dfx
git stash  # make sure we have a clean, original directory
rm -rf node_modules
npm install
cd client/
rm -rf node_modules
npm install # remove current node modules in both the root and in the client folders, and npm installing again
cd ..
./pack.sh #run the build script

exit 0
