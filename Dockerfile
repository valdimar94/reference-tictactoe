FROM node
WORKDIR /code
ENV NODE_PATH=.
COPY run.js .
COPY ./build/ .
COPY package.json .
#ENV NODE_PATH=/opt/lib/node_modules
RUN npm install --silent

EXPOSE 3000

CMD ["node","run.js"]
