const { Http, Runnable } = require("./core");
const Websocket = require('./websocket');
const config = require('../resources/config.json');
const { surveyDatasource, restartPollingTwitter } = require("./survey");

class TwitterEnquetes extends Runnable {

    constructor() {
        super();
    }

    async initHttpApplication(port) {
        const app = await Http(port);
        return app;
    }

    initWebSocket(server) {
        let websocket = require('socket.io')(server);
        return websocket;
    }

    initRestApi(app) {
        require('./rest')(app);
    }

    async onInit() {
        this.application = await this.initHttpApplication(config.http.port);
        this.websocket = this.initWebSocket(this.application.$server);
        this.initRestApi(this.application);
    }

    createDBIndex() {
        return surveyDatasource.createIndex();
    }

    onStart(fn) {
        this.createDBIndex()
            .then(() => {
                this.socketManager = Websocket(this.websocket);
            })
            .then(() => {
                surveyDatasource.getAll()
                    .then((surveys) => {
                        restartPollingTwitter(surveys);
                    });
            })
            .then(() => this.application.start(fn));
    }
    
    onStop(fn) {
        this.application.stop(fn);
    }

}

module.exports = TwitterEnquetes;