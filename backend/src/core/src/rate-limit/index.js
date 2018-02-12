var RateLimit = require('express-rate-limit');

module.exports = new RateLimit({
    windowMs: 60*1000,
    max: 1500,
    delayMs: 0,
    message: "Too many accounts created from this IP, please try again after an hour"
});