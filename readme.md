# Live caption

Live caption app using the [Web Speech API](https://wicg.github.io/speech-api/) and [Electron](https://www.electronjs.org/).

## Installation

1. Download the latests binary from the [releases page](https://github.com/isidrok/caption/releases) and uncompress it in any location you like. Only Windows build is distributed, if you want to create your own build refer to [Working from source](##working-from-source).

2. Install [Google Chrome](https://www.google.com/intl/es_es/chrome/).

## Usage

* Open `live-caption.exe`, this will open
a tab on Google Chrome and launch the caption panel.
* Give the application network access if requested to do so.
* Give Google Chrome access to your microphone.
* To close the application right click on the caption panel and click on close. Do not close Live caption Google Chrome tab.

If you want to display the audio comming from your computer instead of the one from the microphone enable [Stereo Mix](https://www.howtogeek.com/howto/39532/how-to-enable-stereo-mix-in-windows-7-to-record-audio/) and select it as input device in Google Chrome.

## Working from source

1. Install yarn
    ```bash
    npm i -g yarn
    ```
2. Install project dependencies
    ```bash
    yarn
    ```
3. Run in development mode
    ```bash
    yarn start
    ```
4. Build for the current platform
    ```bash
    yarn build
    ```
## Credits

This application was inspired by https://github.com/MidCamp/live-captioning

## License
MIT © [Isidro Torregrosa Torralba](https://github.com/isidrok)
