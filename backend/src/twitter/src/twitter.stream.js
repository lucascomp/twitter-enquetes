const Twitter = require('twitter');
const config = require('./../../../resources/config.json');

const client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
});

const streams = [];

const twitterStreamConnect = async (description, index, callback) => {
    if(streams.length > 2) {
        streams[streams.length - 3].destroy();
    }
    client.stream('statuses/filter', {track: description}, (stream) => {
        streams.push(stream);
        stream.on('data', () => {
            callback(index);
        });
        stream.on('error', (error) => {
            console.log(error);
        });
    });
}

const twitterStreamDisconnect = async () => {
    streams.forEach(stream => {
        stream.destroy();
    })
}

module.exports = {
    twitterStreamConnect,
    twitterStreamDisconnect
}