const surveyRest = require('./src/survey.rest');
const surveyDatasource = require('./src/survey.datasource');
const surveyWebsocketServer = require('./src/survey.websocket');
const { restartPollingTwitter } = require('./src/survey.service');

module.exports = {
    surveyRest,
    surveyDatasource,
    surveyWebsocketServer,
    restartPollingTwitter
};