const express = require('express');
const router = express.Router();

const {
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
} = require('./survey.middleware');

router.get('/all', [
    surveysGetterMiddleware,
    surveysOrderByCreatedAtMiddleware
], (req, res) => res.json(req.surveys));

router.post('/create', [
    surveyHaveNameMiddleware,
    surveyHaveDescriptionMiddleware,
    surveyHaveOptionsMiddleware,
    surveyCreateNewMiddleware
], (req, res) => res.json(req.survey));

router.delete('/:idSurvey', [
    surveyGetByIdMiddleware,
    surveyDeleteMiddleware
], (req, res) => res.status(200).send({ message: 'Enquete cancelada com sucesso.' }));

router.get('/close/:idSurvey', [
    surveyGetByIdMiddleware,
    surveyHaveStatusOpen,
    surveyCloseMiddleware
], (req, res) => res.status(200).send({ message: 'Enquete finalizada com sucesso.' }));

module.exports = router;