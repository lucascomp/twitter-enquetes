const { surveyWebsocketServer } = require('./survey');
const { Socket } = require('./core');

let socketManager;

const configureWebsocket = (io) => {
    Socket.listen(io, () => {
        console.log('Websocket client connected');
    });
    socketManager = new Socket(io);
    surveyWebsocketServer(socketManager);
    return socketManager;
};
  
module.exports = configureWebsocket;