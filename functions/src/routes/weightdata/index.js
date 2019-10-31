const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

/**
 *  get the users weight data
 */
router.get('/', authentication, (req, res) => {
    let { userHandle } = req.user;
    db.collection('WeightData')
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
 *  add a user's weight data
 */
router.post('/', authentication, (req, res) =>{
    let { weight, height } = req.body;
    let { userHandle } = req.user;
    let post = {
        weight: weight,
        height: height,
        bmi: weight/(height*height),
        userHandle,
        createdAt: new Date().toISOString()
    };

    db.collection('WeightData')
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