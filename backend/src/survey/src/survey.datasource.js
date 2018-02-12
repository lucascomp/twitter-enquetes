const { CrudDB } = require('../../core');
const config = require("../../../resources/config.json");
const crud = CrudDB(config.database.survey);

class SurveyDataSource {

    constructor() {
        this.typeModel = 'survey';
    }

    getStatusAberto() {
        return 'OPEN';
    }

    getStatusFechado() {
        return 'CLOSED';
    }

    createIndex() {
        return crud.createIndex({
            index: {
                fields: ['_id', 'typeModel']
            }
        });
    }

    getById(id) {
        return crud.get(this.typeModel, id);
    }

    getAll() {
        return crud.getAll(this.typeModel);
    }

    listenChanges(callback) {
        return crud.listenChanges({ typeModel: this.typeModel }, callback);
    }

    createNewSurvey(survey) {
        return this.getAll()
            .then((surveys) => {
                if(surveys.length !== 0) {
                    return this.deleteSurvey(surveys[0]._id)
                        .then(() => {
                            survey.status = this.getStatusAberto();
                            let options = [];
                            survey.options.forEach((option) => {
                                option.votes = 0;
                                options.push(option);
                            });
                            survey.options = options;
                            return crud.put(this.typeModel, survey)
                                .then((result) => crud.get(this.typeModel, result.id));
                        });
                }
                else {
                    survey.status = this.getStatusAberto();
                    let options = [];
                    survey.options.forEach((option) => {
                        option.votes = 0;
                        options.push(option);
                    });
                    survey.options = options;
                    return crud.put(this.typeModel, survey)
                        .then((result) => crud.get(this.typeModel, result.id));
                }
            });
    }

    voteReceived(idSurvey, index) {
        this.getById(idSurvey)
            .then(survey => {
                survey.options[index].votes++;
                crud.put(this.typeModel, survey)
                    .catch(() => {
                        this.voteReceived(idSurvey, index);
                    });
            });
    }

    deleteSurvey(idSurvey) {
        return crud.delete(this.typeModel, idSurvey)
            .catch((e) => {
                throw new Error('Erro ao deletar Enquete.');
            }
        );
    }

    setStatusSurveyClosed(idSurvey) {
        return this.getById(idSurvey)
            .then(survey => {
                survey.status = this.getStatusFechado();
                return crud.put(this.typeModel, survey)
                    .then((result) => crud.get(this.typeModel, result.id));
            });
    }


}

module.exports = new SurveyDataSource();