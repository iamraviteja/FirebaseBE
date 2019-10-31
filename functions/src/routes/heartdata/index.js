const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

/**
 *  get the users heart data
 */
router.get('/', authentication, (req, res) => {
    let { userHandle } = req.user;
    db.collection('HeartData')
    .orderBy('createdAt', 'desc')
    .where('userHandle', '==', userHandle)
    .get()
    .then(data =>{
        let posts = [];
        data.docs.forEach(doc => {
            posts.push({id:doc.id, data:doc.data()});
        });

        return res.json(posts);
    }).catch(err => res.status(500).send(err));
});

/**
 *  add a user's heart data
 */
router.post('/', authentication, (req, res) =>{
    let { syspressure, dispressure, pulsepressure, heartrate } = req.body;
    let { userHandle } = req.user;
    let post = {
        syspressure: (syspressure || 120),
        dispressure: (dispressure || 80),
        pulsepressure: (pulsepressure || 70),
        heartrate: (heartrate || 65),
        userHandle,
        createdAt: new Date().toISOString()
    };

    db.collection('HeartData')
    .add(post)
    .then(doc => {
        return res.json({
            "success": true,
            "id": doc.id
        });
    }).catch(err => res.status(500).json({
        "success": false,
        "error": err
    }));

});

module.exports = router;