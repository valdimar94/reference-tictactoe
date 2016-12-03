#!/bin/bash

set -e

ssh -i ../../admin-key-pair-ireland.pem  ec2-user@54.171.152.220
ls

exit 0
