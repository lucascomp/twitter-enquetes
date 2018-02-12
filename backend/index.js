const TwitterEnquetes = require('./src/server');
const server = new TwitterEnquetes();

server.start(() => {
    console.log('Server started');
});
