const portfinder = require('portfinder');
const electron = require('electron');
const open = require('open');
const { Display } = require('@caption/display');
const { Transcripter } = require('@caption/transcripter');

function getChromeExec() {
    switch (process.platform) {
        case 'win32': return 'chrome';
        case 'darwin': return 'google chrome';
        default: return 'google-chrome';
    }
}

async function run() {
    const port = await portfinder.getPortPromise();
    const display = new Display(electron);
    const transcripter = new Transcripter(port);

    transcripter.on('connected', function (address) {
        display.intro(`Opening ${address} on Google Chrome.`);
        open(address, { app: [getChromeExec()] });
    });

    transcripter.on('message', function (message) {
        display.write(message);
    });

    display.on('close', async function () {
        transcripter.close();
    });

    display.on('load', function () {
        transcripter.start();
    });
}

run();