const path = require('path');
const EventEmitter = require('events');

class Display extends EventEmitter {
    constructor(electron) {
        super();
        this._electron = electron;
        this._configureApp();
    }
    intro(message) {
        this._window.webContents.send('intro', message);
    }
    write(message) {
        this._window.webContents.send('message', message);
    }
    _configureApp() {
        this._electron.app.on('ready', this._onAppReady.bind(this));
        this._electron.app.on('window-all-closed', this._onAppClosed.bind(this));
    }
    _createWindow() {
        const { width, height } = this._electron.screen.getPrimaryDisplay().size;
        return new this._electron.BrowserWindow({
            width: width * 0.8,
            height: height * 0.1,
            y: 0,
            x: width * 0.1,
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
    }
    _configureWindow() {
        this._window.setAlwaysOnTop(true, 'floating', 1);
        this._window.webContents.on('did-finish-load', this._onPageLoaded.bind(this));
    }
    _start() {
        this._window.loadFile(path.resolve(__dirname, 'public', 'index.html'));
    }
    _onAppReady() {
        this._window = this._createWindow();
        this._configureWindow();
        this._start();
    }
    _onAppClosed() {
        if (process.platform !== 'darwin') {
            this.emit('close');
            this._electron.app.quit();
        }
    }
    _onPageLoaded() {
        this.emit('load');
    }
}

module.exports = { Display };