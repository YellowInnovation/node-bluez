class MediaPlayer {
    constructor(_interface, DbusObject) {
        super();
        this._interface = _interface;
        this._DBusObject = DbusObject;
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

    Name() {
        return this.getProperty("Name");
    }


    Play() {
        return new Promise((resolve, reject)=>{
            this._interface.Play((err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }

    Pause() {
        return new Promise((resolve, reject)=>{
            this._interface.Pause((err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }

    Stop() {
        return new Promise((resolve, reject)=>{
            this._interface.Stop((err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }

    Next() {
        return new Promise((resolve, reject)=>{
            this._interface.Next((err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }

    Previous() {
        return new Promise((resolve, reject)=>{
            this._interface.Previous((err)=>{
                if(err) return reject(err);
                resolve();
            })
        });
    }
}

module.exports = MediaPlayer;