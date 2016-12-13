#!/bin/bash

set -e

#docker rmi $(docker images -q)
git clean -dfx
git stash  # make sure we have a clean, original directory
rm -rf node_modules
npm install
cd client/
rm -rf node_modules
npm install # remove current node modules in both the root and in the client folders, and npm installing again
cd ..
./pack.sh #run the build script
# puts the docker-compose-and-run and docker-compose.yaml files to the aws server to be run
scp -o StrictHostKeyChecking=no -i "../admin-key-pair-ireland.pem" scripts/docker-compose-and-run.sh ec2-user@54.171.205.207:~/docker-compose-and-run.sh
scp -o StrictHostKeyChecking=no -i "../admin-key-pair-ireland.pem" docker-compose.yaml ec2-user@54.171.205.207:~/docker-compose.yaml
scp -o StrictHostKeyChecking=no -i "../admin-key-pair-ireland.pem" build/.env ec2-user@54.171.205.207:~/.env

exit 0
