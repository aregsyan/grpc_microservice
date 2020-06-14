const PROTO_PATH = __dirname + '/../protos/messaging.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('./config');

let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
let messagingProto = grpc.loadPackageDefinition(packageDefinition).messaging;

function chat(call, cb) {
    if(call.request.message === 'connected') {
        cb(null, {message: `Dear ${call.request.name}. You are connected to gRPC microservice. Please enter your name and send me message. I will receive it!`});
    }
    cb(null, {message: `Hey ${call.request.name}. I received your message: ${call.request.message}.`});
}

function start() {
  let server = new grpc.Server();
  server.addService(messagingProto.MessageSender.service, {chat});
  server.bind(`0.0.0.0:${config.port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server microservice started and ready for messages!');
}

if(require.main === module) {
    start();
}
