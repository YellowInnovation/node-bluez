const Bluez = require('bluez');

class BluetoothMedia {
    constructor()
    {
        this.bluetooth = new Bluez();
        this.currentDevice = null;
        this.currentMediaPlayer = null;
        this.currentMediaTransport = null;
        this.adapter = null;
    }

    start()
    {
        // Initialize bluetooth interface
        return this.bluetooth.init().then( () => {
            
            // Register callback for new devices
            this.bluetooth.on('device', async (address, props) => {
                console.log("Found new Device " + address + " " + props.Name);
                if(props.Connected == true)
                {
                    this.currentDevice = await this.bluetooth.getDevice(props.Address);
                }
            });

            // Register callback for new devices
            this.bluetooth.on('adapter', async (path, props) => {
                console.log("Found new adapter " + path);
                this.adapter = await this.bluetooth.getAdapter(path);
                console.log(this.adapter);
            });

            // Register callback for new devices
            this.bluetooth.on('media_player', async (address, props) => {
                this.bluetooth.getMediaPlayer(address).then(mediaplayer => {
                    this.currentMediaPlayer = mediaplayer;
                });
            });

            // Register callback for new devices
            this.bluetooth.on('media_transport', async (address, props) => {
                this.bluetooth.getMediaTransport(address).then(mediatransport => {
                    this.currentMediaTransport = mediatransport;
                });
            });

            this.bluetooth.registerDummyAgent("1234");

            // listen on first bluetooth adapter
            return this.bluetooth.getAdapter('hci0').then(adapter => {
                this.adapter = adapter;
                this.adapter.Powered(true);
                this.adapter.Discoverable(true);
                this.adapter.Alias("Monimalz");
            }).catch( e => {
                console.log(e);
            });
        }).catch( e => {
            console.log(e);
        });
    }
}

var bluetoothMedia = new BluetoothMedia();
bluetoothMedia.start().then( function() {
    console.log('done');
});






