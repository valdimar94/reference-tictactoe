FROM node
WORKDIR /code
ENV NODE_PATH=.
COPY . .
#ENV NODE_PATH=/opt/lib/node_modules
RUN npm install --silent

EXPOSE 8080

CMD ["node","run.js"]
