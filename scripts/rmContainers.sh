#!/bin/bash

docker stop $(docker ps -a -q) #stops running containers
docker rm $(docker ps -a -q) # removes them
