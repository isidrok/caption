const fs = require('fs-extra');
const path = require('path');
const MAX_LENGTH = 10 * 1024;

function createFileName(){
    return `${new Date().toLocaleString().replace(/[:/]/g, '-')}.txt`;
}

class Logger {
    constructor() {
        this._position = 0;
        this._buffer = Buffer.alloc(MAX_LENGTH);
    }
    write(str) {
        this._position += this._buffer.write(
            this._format(str),
            this._position
        );
    }
    async save(dir, fileName) {
        dir = dir || 'logs';
        fileName = fileName || createFileName();
        const filePath = path.join(dir, fileName);
        await fs.mkdirp(dir);
        return fs.writeFile(filePath, this.toString(), 'utf8');
    }
    toString() {
        return this._buffer.toString('utf-8', 0, this._position);
    }
    close(){
        this._buffer = null;
    }
    _format(str) {
        const time = new Date().toLocaleTimeString();
        return `[${time}] ${str}\n`;
    }
}

module.exports = { Logger };