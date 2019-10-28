const { checkSchema } = require('express-validator');
const { checkEmptyString } = require('./customvalidations');
const ERROR_MESSAGES = require('../constants/error');

module.exports = checkSchema({
    email:{
        custom: checkEmptyString,
        isEmail: {
            errorMessage: ERROR_MESSAGES.emailInvalidMsg
        }
    },
    password: {
        custom: checkEmptyString
    }
});