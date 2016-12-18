#!/bin/bash

docker rmi -f $(docker images -q) #removes images
