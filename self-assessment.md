---

1. Jenkins URL and username and password.
myschool skil

2. Game URL (AWS)
myschool skil


## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- __Docker build__
* _Dockerfile_ - is copied to the build folder by pack.sh, and is run from there
* _start.sh_ - is run from Dockerfile. Has the db migration and runs run.js
* _pack.sh_ - main build file. Copies everything that is needed to build the image to build folder. Creates the docker image and pushes to docker hub. Utilizes Dockerfile and start.sh.

- __Docker compose__
* _docker-compose.yaml_ - when docker-compose up is run, this file dictates the server ports, what image will be used from dockerhub and more

- __AWS Provisioning__
* _was never completed but some files were created and used but only after the instance was manually created on AWS. The following files can be found in the provisioning directory:_
* _awsinstancecreate and awsinstancecreate.sh_ - more or less useless
* _awssetup_ - was used at first to prep the AWS machine for use but was later replaced by
* _ec2-instance-init.sh_ - makes the AWS machine ready for use

- __Other scripts__
* __files found in scripts/__
* _advlogin.sh_ - connects to the ubuntu advania server
* _advserverpack.sh_ - is run on the Jenkins references-tictactoe item, which is the commit stage. Removes node_modules and installs npm again, runs pack.sh and secure copies needed files to AWS, docker-compose.yaml, docker-compose-and-run.sh and the .env file.
* _awsserverdockercomposeup.sh_ - ssh into the AWS server and runs docker-compose-and-run.sh there. The file itself is not really used except to store the command but it's contents are used on Jenkins deploy step.
* _dependancyChange.sh_ - removes node_modules both from root and client while also doing npm install. This is to make sure node_modules stay up to date
* _docker-compose-and-run.sh_ - is copied to AWS and run there. Runs up the image.
* _junitResults.sh_ - a file run by Jenkins in the commit stage(references-tictactoe). Creates the directory and runs the unit tests. .xml files with details of the tests will be created in the junitResults directory.


## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)

- API Acceptance test - fluent API

- Load test loop

- UI TDD

- Is the game playable?



## Data migration

Did you create a data migration.

- Migration up and down



## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage

- Acceptance Stage

- Capacity Stage

- Other



Did you use any of the following features in Jenkins?

- Schedule or commit hooks

- Pipeline

- Jenkins file

- Test reports

- Other



## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.



## Other

Anything else you did to improve you deployment pipeline of the project itself?
