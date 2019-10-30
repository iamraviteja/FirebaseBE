const { validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
    const result = validationResult(req);
    if(result.errors.length){
        return res.status(400).json({ errors:result.errors });
    }
    next();
}

module.exports = { checkValidations };