const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Dialogflow API
 */
const { SessionsClient } = require('dialogflow');

/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

router.get('/', authentication, (req, res) => {
    const { queryInput } = req.body;
    const sessionId = req.user.userHandle;
    const sessionClient = new SessionsClient();
    const session = sessionClient.sessionPath('fir-basics-9f212', sessionId);

    console.log(queryInput);

    sessionClient.detectIntent({ session, queryInput})
    .then(data => {
        let queryResult = data[0].queryResult;
        return res.status(200).json({ queryResult });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).json({ error: err });
    })

});

module.exports = router;