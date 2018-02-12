const datasource = require('./survey.datasource');

let surveysUpdateStream;

const getSurveyUpdateStream = (socketManager) => {
    try {
        if(surveysUpdateStream) {
            return surveysUpdateStream;
        }
        surveysUpdateStream = socketManager.publish(`survey:update`);
        return surveysUpdateStream;
    }
    catch (e) {
        throw e;
    }
};

const publishSurvey = (socketManager, survey) => () =>
    getSurveyUpdateStream(socketManager, survey._id).write(survey);

const createOnChangeSurveyEvent = (socketManager) => {
    datasource.listenChanges((updatedSurvey) => {
        setImmediate(publishSurvey(socketManager, updatedSurvey));
    });
};

module.exports = (socketManager) => {
    return {
        createOnChangeSurveyEvent: createOnChangeSurveyEvent(socketManager)
    };
};