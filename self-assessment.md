---

1. Jenkins URL and username and password.
myschool skil

2. Game URL (AWS)
myschool skil


## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- __Docker build__
* _advserverpack.sh_ - is run from Jenkins. installs npm and runs pack.sh.
* _start.sh_ - is run from Dockerfile. Has the db migration and runs run.js
* _pack.sh_ - main build file. Copies everything that is needed to build the image to build folder. Creates the docker image and pushes to docker hub. Utilizes Dockerfile and start.sh.

- __Docker compose__
* _docker-compose-and-run.sh_ - is copied to AWS and run there. Runs up the image. Utilizes the other files copied to the AWS server, like docker-compose.yaml.

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
* _rmContainers.sh and rmImages.sh_ - do exactly what it says on the tin. Removes images and containers from the machine
* _runaws.sh_ - connects to AWS machine via ssh


## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)  __Done__

- API Acceptance test - fluent API __Done__

- Load test loop __Done__

- UI TDD __Not done__

- Is the game playable? __Not done__



## Data migration

Did you create a data migration.

- Migration up and down
* Yes, Dockerfile runs a script called start.sh that runs the data migration



## Jenkins

Do you have the following Jobs and what happens in each Job:

- __Commit Stage__
* yes, it's called references-tictactoe. This job waits for a git commit to the main repo via webhook, runs the advserverpack.sh which builds the docker image. This stage also runs unit tests. If everything is successful, it triggers the next step which is tictactoe deploy.
* Jenkins runs:
./scripts/advserverpack.sh
./scripts/junitResults.sh

- __Acceptance Stage__
* yes, it's called tictactoe acceptance test. This job waits for tictactoe deploy to finish successfully and runs acceptance tests(api test), but only after running dependancyChange.sh to have a fresh install of npm.
* Jenkins runs:
./scripts/dependancyChange.sh
npm run apitest

- __Capacity Stage__
* After the acceptance stage has finished successfully, the capacity stage is run, called tictactoe loadtest. Here load tests are run utilizing the same api tests but in mass. Here some problems began. The Advania ubuntu server is quite unreliable. Sometimes the loadtest for playing the game took about 14 sec, but times have rached upwards of 80 sec, making it hard to predict accurate time.
* Jenkins runs:
./scripts/dependancyChange.sh
npm run loadtest

- __Other__
* the stage after the commit stage is the deploy stage, called tictactoe deploy. This job is only triggered if the commit stage was successful. Here it contacts the AWS server and runs a script deploying the image to a public ip address.
* Jenkins runs:
ssh -o StrictHostKeyChecking=no -i "../admin-key-pair-ireland.pem" ec2-user@54.171.205.207 "sleep 2 && ./docker-compose-and-run.sh"



__Did you use any of the following features in Jenkins?__

- __Schedule or commit hooks
* github commit hooks were utilized


- __Pipeline__
* pipeline was set up on Jenkins

- __Jenkins file__
* no

- __Test reports__
* Yes, all .xml files from unit tests are deployed to junitResults directory and are displayed on Jenkins where every test can be viewed and see if any failed.

- __Other__
* no


## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.
* no monitoring



## Other

Anything else you did to improve you deployment pipeline of the project itself?
