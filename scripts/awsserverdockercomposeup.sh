#!/bin/bash

ssh -o StrictHostKeyChecking=no -i "../admin-key-pair-ireland.pem" ec2-user@54.171.205.207 "cat ~/scripts/docker-compose-and-run.sh"
