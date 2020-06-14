const PROTO_PATH = __dirname + '/../protos/messaging.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const config = require('./config');

class GrpcClient {
    constructor() {
        let packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
            {keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        this.messagingProto = grpc.loadPackageDefinition(packageDefinition).messaging;
    }

    init(host, port) {
        host = host || config.host || 'localhost';
        port = port || config.port || '4500';
        this.grpcClient = new this.messagingProto.MessageSender(`${host}:${port}`, grpc.credentials.createInsecure());
    }

    sendMessage(data, cb) {
        this.grpcClient.chat(data, cb);
    }
}

module.exports = GrpcClient;

if(require.main === module) {
    let instance = new GrpcClient();
    instance.init()
    instance.sendMessage({name:'Areg', message:'Hello World'}, function(e, r) {
        if(e) {
            console.log(e)
            process.exit(1)
        } else {
            console.log(r);
            process.exit(0);
        }
    });
}

