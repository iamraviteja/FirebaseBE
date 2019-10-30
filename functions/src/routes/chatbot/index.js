const router = require('express').Router();
const { db } = require('../../utils/admin');
const intentMapObj = require('./intentmap');

/**
 *  Dialogflow API
 */
const { SessionsClient } = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');


/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

router.get('/', authentication, (req, res) => {
    const { queryInput } = req.body;
    const sessionId = req.user.userHandle;
    const sessionClient = new SessionsClient();
    const session = sessionClient.sessionPath('fir-basics-9f212', sessionId);

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

router.post('/webhook', (req, res) => {
    const agent = new WebhookClient({ request:req, response:res });
    const result = req.body.queryResult;

    let intentMap = new Map();

    for (const key in intentMapObj) {
        if (intentMapObj.hasOwnProperty(key)) {
            const fn = intentMapObj[key](agent, result);
            intentMap.set(key, fn);
        }
    }

    agent.handleRequest(intentMap);
});

module.exports = router;