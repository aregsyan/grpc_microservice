const express = require('express')
const grpcClient = require('../client_microservice/grpc_client');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

let grpcMessenger = new grpcClient();
grpcMessenger.init();

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './fe')));

app.post('/message', function (req, res) {
    grpcMessenger.sendMessage(req.body, (e, r) => {
        if(e) return res.status(400).send(e);
        res.status(200).send(r);
    });
});

app.get('/connected', function (req, res) {
    const m = {message: 'connected', name: 'user'};
    grpcMessenger.sendMessage(m, (e, r) => {
        if(e) return res.status(400).send(e);
        res.status(200).send(r);
    });
});

app.listen(8080);
