const ERROR_MESSAGES = require('../constants/error');

const confirmPassword = {
    options: (value, { req }) => {
        return (value === req.body.password);
    },
    errorMessage: ERROR_MESSAGES.confirmPwdMsg
};

const checkEmptyString = {
    options: value => {
        return (value.trim() !== "");
    },
    errorMessage: ERROR_MESSAGES.requiredMsg
};

module.exports = { confirmPassword, checkEmptyString }

