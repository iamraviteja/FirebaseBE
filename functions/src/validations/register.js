const { checkSchema } = require('express-validator');
const { confirmPassword } = require('./customvalidations');
const ERROR_MESSAGES = require('../constants/error');

module.exports = checkSchema({
    email:{
        isEmail:{
            errorMessage: ERROR_MESSAGES.emailInvalidMsg
        }
    },
    confirmPassword: {
        custom: confirmPassword
    }
});