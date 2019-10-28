const { validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
    const result = validationResult(req);
    if(!result.errors.length){
        next();
    }else{
        return res.status(400).json({ errors:result.errors });
    }
}

module.exports = { checkValidations };