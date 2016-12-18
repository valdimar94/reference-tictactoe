#!/bin/bash

set -e

docker-compose down # Shuts down the old image
docker rmi $(docker images -q) # remove all old images to make sure an old image is not accidentally run
docker-compose up -d # runs up the docker image on the aws server.

exit 0
