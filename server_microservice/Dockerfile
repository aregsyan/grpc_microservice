FROM node:current

WORKDIR /app
COPY server_microservice /app/server_microservice
COPY protos /app/protos
RUN cd server_microservice && npm install && cd ../
CMD node server_microservice/grpc_server.js