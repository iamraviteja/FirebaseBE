const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

/**
 *  get the users profile data
 */
router.get('/', authentication, (req, res) => {
    let { userHandle } = req.user;
    return res.json(req.user);
});

module.exports = router;