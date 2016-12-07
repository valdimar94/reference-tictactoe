#!/bin/bash

INSTANCE_ID=$(aws ec2 run-instances  --user-data file://ec2-instance-init.sh --image-id ami-9398d3e0 --security-group-ids ${SECURITY_GROUP_ID} --count 1 --instance-type t2.micro --key-name ${SECURITY_GROUP_NAME} --query 'Instances[0].InstanceId'  --output=text)
echo ${INSTANCE_ID} > ./ec2_instance/instance-id.txt
