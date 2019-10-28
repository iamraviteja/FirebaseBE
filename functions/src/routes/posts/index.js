const router = require('express').Router();
const { db } = require('../../utils/admin');

/**
 *  Auth middleware
 */
const authentication = require('../../utils/authentication');

/**
 *  get the posts
 */
router.get('/', authentication, (req, res) => {
    db.collection('Posts')
    .orderBy('createdAt', 'desc')
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
 *  add a post
 */
router.post('/', authentication, (req, res) =>{
    let { Title, Description, } = req.body;
    let { userHandle } = req.user;
    let post = {
        Title: (Title || ''),
        Description: (Description || ''),
        Views: 0,
        userHandle,
        createdAt: new Date().toISOString()
    };

    db.collection('Posts')
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