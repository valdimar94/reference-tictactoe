#!/bin/bash/

set -e

yum update -y #update instances
yum install -y docker #install docker so images and containers can be run
curl -L "https://github.com/docker/compose/releases/download/1.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose #need docker-compose to be able to run the .yaml file
chmod +x /usr/local/bin/docker-compose #make the docker-compose executable
service docker start #start docker
usermod -a -G docker ec2-user #changes permission so ec2-user doues not need to sudo every time docker is run

touch ec2-init-done.markerfile #if all commands before were executed this file will be created, allowing us to check remotely if all the commands were executed

exit 0
