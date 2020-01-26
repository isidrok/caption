const path = require('path');
const { app, BrowserWindow, screen } = require('electron');
const { Transcripter } = require('@caption/transcripter');

const transcripter = new Transcripter(3000);
let win;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().size;
    win = new BrowserWindow({
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

function onPageLoaded() {
    transcripter.on('connected', onConnected);
    transcripter.start();
}

function onConnected(address) {
    win.webContents.send('intro', `Open Google Chrome and navigate to ${address}`);
}

function onMessage(message) {
    console.log(message);
    win.webContents.send('message', message);
}

function loadPage() {
    win.loadFile(path.resolve(__dirname, 'public', 'index.html'));
}

function start() {
    createWindow();
    win.setAlwaysOnTop(true, 'floating', 1);
    win.webContents.on('did-finish-load', onPageLoaded);
    transcripter.on('message', onMessage);
    loadPage();
}

function close() {
    if (process.platform !== 'darwin') {
        transcripter.close();
        app.quit();
    }
}

app.on('ready', start)
app.on('window-all-closed', close);