const datasource = require('./survey.datasource');

const validateSurveyName = async (survey) => {
    if(survey.name) {
        return survey;
    }
    throw new Error('É necessário informar o nome da Enquete.');
}

const validateSurveyDescription = async (survey) => {
    if(survey.description) {
        return survey;
    }
    throw new Error('É necessário informar a descrição da Enquete.');
}

const validateSurveyOptions = async (survey) => {
    if(Array.isArray(survey.options)) {
        if(survey.options.length === 2 || survey.options.length === 3) {
            survey.options.forEach((option) => {
                if(!option.description) {
                    throw new Error('É necessário informar a descrição das opções Enquete.');
                }
            });
            return survey;
        }
        throw new Error('Para iniciar a Enquete, é preciso ter duas ou três opções.');
    }
    throw new Error('É necessário informar as opções da Enquete.');
}

const validateSurveyStatusOpen = async (idSurvey) => {
    let survey = await datasource.getById(idSurvey);
    if(datasource.getStatusAberto() === survey.status) {
        return survey;
    }
    throw new Error('Esta Enquete já foi finalizada.');
}

const validateSurveyId = async (survey, params) => {
    try {
        return datasource.getById(survey && survey._id ? survey._id : params.idSurvey);
    }
    catch (err) {
        if (err.status !== 404) {
            throw err;
        } else {
            throw new NaoEncontradoErro('Esta Enquete não existe.');
        }
    }
}

module.exports = {
    validateSurveyName,
    validateSurveyDescription,
    validateSurveyOptions,
    validateSurveyStatusOpen,
    validateSurveyId
}