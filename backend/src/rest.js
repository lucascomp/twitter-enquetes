const express = require('express');
const { surveyRest } = require('./survey');
const { rateLimit } = require('./core');

function configureRest(application) {

    application.use(rateLimit);

    application.use('/survey', surveyRest);

}

module.exports = configureRest;