#!/bin/bash

set -e

ssh -i ../admin-key-pair-ireland.pem  ec2-user@54.171.205.207

exit 0

# connects to ec2 instance on AWS, using the .pem key
