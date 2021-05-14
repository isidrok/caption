const portfinder = require('portfinder');
const electron = require('electron');
const open = require('open');
const { Display } = require('@caption/display');
const { Transcripter } = require('@caption/transcripter');

async function run() {
    const port = await portfinder.getPortPromise();
    const display = new Display(electron);
    const transcripter = new Transcripter(port);

    transcripter.on('connected', function (address) {
        display.intro(`Opening ${address} on Google Chrome.`);
        open(address, { app: {name: open.apps.chrome} });
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