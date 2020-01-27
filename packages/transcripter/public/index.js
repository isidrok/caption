(function () {
    const socket = window.io();
    const recognition = new window.webkitSpeechRecognition();
    const IGNORED_ERRORS = [
        'no-speech',
        'audio-capture',
        'network',
        'bad-grammar'
    ];
    function notify(tag, message) {
        socket.emit(tag, message);
    }
    function refresh() {
        try {
            recognition.abort();
            recognition.start()
        } catch (err) { }
    }
    function onend() {
        recognition.start();
    }
    function onresult(ev) {
        const { results, resultIndex } = ev;
        for (let i = resultIndex; i < results.length; ++i) {
            const { confidence, transcript } = results[i][0];
            if (confidence > 0.4) {
                notify('message', transcript);
            }
        }
    }
    function onerror(ev) {
        const { error } = ev;
        if (IGNORED_ERRORS.includes(error)) {
            refresh();
        }
    }

    socket.on('close', function(){
        window.close();
    });

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onend = onend;
    recognition.onresult = onresult;
    recognition.onerror = onerror;
    recognition.start();
}());