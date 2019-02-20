
class MediaTransport {
    constructor(_interface, DbusObject) {
        var self = this;
        self._interface = _interface;
        self._DBusObject = DbusObject;

        this._DBusObject.on('signal', function(uniqueBusName, sender, objectPath, interfaceName, signalName, args) {

            if(objectPath == self._interface.objectPath)
            {
                console.log(signalName);
                console.log(args);
            }
        });
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

module.exports = MediaTransport;