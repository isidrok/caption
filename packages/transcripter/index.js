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

function createServer({ public, onMessage }) {

    return server;
}

class Transcripter extends EventEmitter {
    constructor(port) {
        super();
        this._port = port;
        this._createServer();
    }
    start() {
        this._server.listen(this._port, this._onConnected.bind(this));
    }
    close() {
        this._server.close();
        this._socket.emit('close');
        this._io.close();
    }
    _createServer() {
        this._app = express();
        this._server = http.createServer(this._app);
        this._io = socket(this._server);
        this._app.use(express.static(PUBLIC));
        this._io.on('connection', (socket)  => {
            this._socket = socket;
            socket.on('message',  this._onMessage.bind(this));
            socket.on('final',  this._onFinal.bind(this));
        });
    }
    _onMessage(message) {
        this.emit('message', capitalize(message));
    }
    _onFinal(message){
        this.emit('final', capitalize(message));
    }
    _onConnected() {
        this.emit('connected', `http://localhost:${this._server.address().port}`);
    }
}

module.exports = { Transcripter };