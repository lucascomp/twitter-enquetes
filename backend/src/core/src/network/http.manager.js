const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

const HttpManager = async (port) => {

    const app = express();

    app.$server = require('http').createServer(app);

    app.use(cookieParser());
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    app.use(bodyParser.raw({limit: '5mb'}));
    app.use(cors({
        origin: '*'
    }));

    app.start = (fn) => app.$server.listen(port, fn);
    app.stop = (fn) => app.$server.close(fn);

    return app;
}

module.exports = HttpManager;