# grpc_microservice


gRPC microservices are structured with client and server microservices. 

The Client: 
    It is simple express app, which sends the user messages to the server microservice and return the response from that. 

The Server:
    gRPC server which listens for messages and respond to message that it has received them.

This microservices are in local network created with docker-compose.
The microservice are inherited from nodejs:current Docker image

 
Usage:
```
git clone https://github.com/aregsyan/grpc_microservice.git

make run // for start
make clean // for stop and clean dangling containers

http://localhost:8080/ // open and see
```

Prerequirements and dependenices:

1. Installed Docker and docker-compose
2. Logged in Docker
3. make
