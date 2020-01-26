

const EventEmitter = require('events');
const path = require('path');
const express = require('express');
const http = require('http')
const socket = require('socket.io');

const PUBLIC = path.resolve(__dirname, 'public');

function capitalize(string) {
    string = string.trim();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createServer({public, onMessage}){
    const app = express();
    const server = http.createServer(app);
    const io = socket(server);
    app.use(express.static(public));
    io.on('connection', function (socket) {
        socket.on('message', onMessage);
    });
    return server;
}


class Transcripter extends EventEmitter {
    constructor(port) {
        super();
        this._port = port;
        this._server = this._createServer();
    }
    start(){
        this._server.listen(this._port, this._onConnected.bind(this));
    }
    close(){
        this._server.close();
    }
    _createServer() {
        return createServer({
            public: PUBLIC,
            onMessage: this._onMessage.bind(this),
        });
    }
    _onMessage(message) {
        this.emit('message', capitalize(message));
    }
    _onConnected() {
        this.emit('connected', `http://localhost:${this._server.address().port}`);
    }
}

module.exports = {Transcripter};