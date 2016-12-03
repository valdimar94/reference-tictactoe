FROM node
WORKDIR .
ENV NODE_PATH .
COPY . .
RUN npm install --silent

EXPOSE 80

CMD ["./start.sh"]
