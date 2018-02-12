const { twitterStreamConnect, twitterStreamDisconnect } = require('./../../twitter');
const datasource = require('./survey.datasource');

const surveyFollowPollingTwitter = (survey) => {
    survey.options.forEach((option, index) => {
        twitterStreamConnect(option.description, index, (index) => {
            datasource.voteReceived(survey._id, index);
        });
    });

    datasource.listenChanges((updatedSurvey) => {
        if(updatedSurvey._deleted || updatedSurvey.status === datasource.getStatusFechado()) {
            twitterStreamDisconnect();
        }
    });

    return survey;
}

const restartPollingTwitter = (surveys) => {
    surveys.forEach((survey) => {
        surveyFollowPollingTwitter(survey);
    });
}

module.exports = {
    surveyFollowPollingTwitter,
    restartPollingTwitter
}