const router = require('express').Router();
const { db } = require('../../utils/admin');
const firebase = require('firebase');

/**
 * validations imports
 */
const { checkValidations } = require('../../validations/checkvalidations');
const registerValidation = require('../../validations/register');
const loginValidation = require('../../validations/login');

/**
 *  Register
 */
router.post('/register', registerValidation, checkValidations, (req, res) => {
    let { email, password, confirmPassword, userHandle } = req.body;
    let userToken, userId;

    db.doc(`/Users/${userHandle}`).get()
    .then(doc => {
        if(doc.exists){ 
            throw new Error('user handle exists');
        }else {
            return firebase.auth().createUserWithEmailAndPassword(email, password);
        }
    })  
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(token => {
        userToken = token;
        const newUser = { email, userHandle, createdAt: new Date().toISOString(), userId };
        return db.doc(`/Users/${userHandle}`).set(newUser);
    })
    .then(data => {
        return res.status(201).json({ userToken, userId });
    })
    .catch(err => {
        let { code, name, message } = err;
        return res.status(400).json({error:{ code, name, message }});
    });

});


/**
 *  Login
 */
router.post('/login', loginValidation, checkValidations, (req, res) => {
    let { email, password } = req.body;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(userToken => {
        return res.status(200).json({ userToken });
    })
    .catch(err => {
        let { code, name, message } = err;
        return res.status(400).json({error:{ code, name, message }});
    })
});


/**
 *  Logout
 */
router.get('/logout', (req, res) => {

});

module.exports = router;