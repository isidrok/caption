(function () {
    const { ipcRenderer } = require('electron');
    const display = document.getElementById('display');
    let timeout;
    ipcRenderer.on('message', function (ev, message) {
        clearTimeout(timeout);
        display.textContent = message;
        display.scrollTo(0, display.scrollHeight);
        timeout = setTimeout(function () {
            display.textContent = '';
            display.scrollTo(0, 0);
        }, 5000);
    });
    ipcRenderer.on('intro', function (ev, message) {
        display.textContent = message;
        display.scrollTo(0, display.scrollHeight);
    });
}());