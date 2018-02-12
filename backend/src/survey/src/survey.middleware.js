const { createAsyncMiddleware } = require('./../../core');
const datasource = require('./survey.datasource');

const { surveyFollowPollingTwitter } = require('./survey.service');

const {
    validateSurveyName,
    validateSurveyDescription,
    validateSurveyOptions,
    validateSurveyStatusOpen,
    validateSurveyId
} = require('./survey.validation');

const createSurveysAsyncMiddleware = createAsyncMiddleware('surveys');
const createSurveyAsyncMiddleware = createAsyncMiddleware('survey');

const surveyHaveNameMiddleware = createSurveyAsyncMiddleware(async (prop, req) => validateSurveyName(req.body));

const surveyHaveDescriptionMiddleware = createSurveyAsyncMiddleware(async (prop, req) => validateSurveyDescription(req.body));

const surveyHaveOptionsMiddleware = createSurveyAsyncMiddleware(async (prop, req) => validateSurveyOptions(req.body));

const surveyHaveStatusOpen = createSurveyAsyncMiddleware(async (prop, req) => validateSurveyStatusOpen(req.params.idSurvey));

const surveyCreateNewMiddleware = createSurveyAsyncMiddleware((prop, req) => datasource.createNewSurvey(req.body).then((survey) => surveyFollowPollingTwitter(survey)));

const surveysGetterMiddleware = createSurveysAsyncMiddleware((prop, req) => datasource.getAll());

const surveysOrderByCreatedAtMiddleware = createSurveysAsyncMiddleware(async (surveys) => surveys.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1));

const surveyGetByIdMiddleware = createSurveyAsyncMiddleware(async (prop, req) => validateSurveyId(req.body, req.params));

const surveyDeleteMiddleware = createSurveyAsyncMiddleware((prop, req) => datasource.deleteSurvey(req.params.idSurvey));

const surveyCloseMiddleware = createSurveyAsyncMiddleware((prop, req) => datasource.setStatusSurveyClosed(req.params.idSurvey));

module.exports = {
    surveyHaveNameMiddleware,
    surveyHaveDescriptionMiddleware,
    surveyHaveOptionsMiddleware,
    surveyHaveStatusOpen,
    surveyCreateNewMiddleware,
    surveysGetterMiddleware,
    surveysOrderByCreatedAtMiddleware,
    surveyGetByIdMiddleware,
    surveyDeleteMiddleware,
    surveyCloseMiddleware
}