const lodash = require('lodash');
const Writable = require('stream').Writable;
const Readable = require('stream').Readable;


class SocketSubscribeStream extends Readable {
    constructor(socketClient, topic, options){
        let defaultOptions = {
            objectMode: true
        };
        options = lodash.defaults(options, defaultOptions);

        super(options);
        this._topic = topic;
        this._socketClient = socketClient;
        this._socketClient.on(this._topic, (data) => this._onMessage(data));
    }

    _read( ){
        // future implementions
    }

    _onMessage(data){
        if(!this.push(data)){ // se não for possivel inserir dados, então dropa os pacotes
            this.emit('drop', data); // se dropar pacotes, dispara o evento
        }
    }
}

class SocketPublishStream extends Writable {
    constructor(socketClient, topic, options){
        let defaultOptions = {
            objectMode: true
        };
        options = lodash.defaults(options, defaultOptions);
        super(options);
        this._topic = topic;
        this._socketClient = socketClient;
    }

    _write(chunk, encoding, callback){
        // encoding esta ignorado
        this._socketClient.emit(this._topic, chunk);
        if(callback) {
          callback(); // funções de callback
        }
    }
}

///////////////////////
// SocketManager //
///////////////////////

class SocketManager {
    static listen(io, fn){
        if(fn && typeof fn === 'function'){
            io.on('connection', (socket) => fn( new SocketManager(socket) ));
        }else{
            throw new TypeError('Excepted in fn a function');
        }
    }

    static connect(io, url, fn){
        let socket = io.connect(url);
        let manager = new SocketManager(socket);
        if(fn){
            if(typeof fn === 'function'){
                fn(manager);
            }else{
                throw new TypeError('Excepted in fn a function');
            }
        }
        return manager;

    }

    constructor(socket){
        this._socket = socket;
    }

    subscribe(topic, options){
        return new SocketSubscribeStream(this._socket, topic, options);
    }

    publish(topic, options){
        return new SocketPublishStream(this._socket, topic, options);
    }
}

module.exports = SocketManager;