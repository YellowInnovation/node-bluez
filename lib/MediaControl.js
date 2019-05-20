const {EventEmitter} = require('events');

class MediaControl extends EventEmitter {
    constructor(_interface, DbusObject) {
        super();
        this._interface = _interface;
        this._DBusObject = DbusObject;
    }

    stopEvents() {
        this._DBusObject.removeListener('signal', this.signalHandler.bind(this));
    }

    initEvents() {
        this.stopEvents();
        this._DBusObject.on('signal', this.signalHandler.bind(this));
    }

    signalHandler(uniqueBusName, sender, objectPath, interfaceName, signalName, args) {
        if (objectPath === this._interface.objectPath) {
            if (Array.isArray(args)) {
                if (args.length > 1 && args[0] === 'org.bluez.MediaControl1')
                    Object.entries(args[1]).forEach(entry => {
                        let key = entry[0];
                        let value = entry[1];
                        this.emit("PropertyChanged", this._interface.objectPath, key, value);
                    });
            }
        }
    }



        /****** Properties ******/
    getProperties() {
        return new Promise((resolve, reject)=>{
            this._interface.getProperties((err, props)=>{
                if(err) return reject(err);
                resolve(props);
            })
        });
    }

    getProperty(name) {
        return new Promise((resolve, reject)=>{
            this._interface.getProperty(name, (err, val)=>{
                if(err) return reject(err);
                resolve(val);
            })
        });
    }

    setProperty(name, value) {
        return new Promise((resolve, reject)=>{
            this._interface.setProperty(name, value, (err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }

}

module.exports = MediaControl;