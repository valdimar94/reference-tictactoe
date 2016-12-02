FROM node
WORKDIR .
ENV NODE_PATH .
COPY . .
RUN npm install --silent

EXPOSE 3000

CMD ["./start.sh"]
