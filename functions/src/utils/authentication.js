const { db, admin } = require('../utils/admin');
const ERROR_MESSAGES = require('../constants/error');

module.exports = (req, res, next) => {
    let { authorization } = req.headers;
    let userToken, BEARER = 'Bearer ', code = 'No token found', message = ERROR_MESSAGES.noTokenFoundMsg;
    if(authorization && authorization.startsWith(BEARER)){
        userToken = authorization.split(BEARER)[1];
        admin.auth().verifyIdToken(userToken)
        .then(data =>{
            req['user'] = data;
            return db.collection('Users').where('userId', '==', req.user.uid).limit(1).get();
        })
        .then(data =>{
            req.user.userHandle = data.docs[0].data().userHandle;
            return next();
        })
        .catch(err =>{
            let { code, name, message } = err;
            return res.status(403).json({ error: { code, name, message }});
        });
    }else{
        return res.status(403).json({ error: { code, message }});
    }
    
}