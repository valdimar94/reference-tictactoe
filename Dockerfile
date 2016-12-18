FROM node
# where the base image is
WORKDIR .
# root of the image
ENV NODE_PATH .
# the environments needed
COPY . .
# copy everything from the build folder to the image
RUN npm install --silent
# fresh npm install, --silent so additional warnings do not show up
EXPOSE 80
# the port for aws server
CMD ["./start.sh"]
# run the start script that migrates db and runs the run.js script
