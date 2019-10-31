const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Dialogflow API
 */
const { SessionsClient } = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');


/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

router.post('/', authentication, (req, res) => {
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

    async function getHealthAttr(agent) {
        let session = req.body.session.split('/');
        let userHandle = session[(session.length - 1)];
        let param = result.parameters.healthattr;
        let heartData;

        let textData = await db.collection('HeartData')
        .where('userHandle', '==', userHandle)
        .orderBy('createdAt')
        .limit(1)
        .get();

        if(param.includes('bp') || param.includes('blood pressure') || param.includes('blood')){
            heartData = 'latest blood pressure '+textData.docs[0].data().syspressure+'/'+textData.docs[0].data().dispressure;
        }else{
            heartData = 'latest heart rate '+textData.docs[0].data().heartrate;
        }

        let text = 'Hey '+ userHandle + ' your ' + heartData;

        agent.add(text);
        
    }

    function getPosts(agent) {
        agent.add('get my posts....');
    }

    let intentMap = new Map();
    intentMap.set('GET_POSTS', getPosts);
    intentMap.set('GET_HEART_RATE', getHealthAttr);

    agent.handleRequest(intentMap);
});

module.exports = router;