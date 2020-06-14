FROM node:current

WORKDIR /app
COPY package.json /app
COPY src /app/src
COPY client_microservice /app/client_microservice
COPY protos /app/protos
RUN npm install && cd client_microservice && npm install && cd ../
CMD node src/app.js