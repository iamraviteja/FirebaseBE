const express = require('express');
const cors = require('cors');
const { db } = require('./utils/admin');

/**
 *  router imports
 */
const posts = require('./routes/posts');
const auth = require('./routes/authentication');
const chatbot = require('./routes/chatbot');
const profile = require('./routes/profile');
const weightdata = require('./routes/weightdata');
const heartdata = require('./routes/heartdata');

const server = express();
server.use(cors());

/**
 *  Use routes
 */
server.use('/posts', posts);
server.use('/auth', auth);
server.use('/chat', chatbot);
server.use('/profile', profile);
server.use('/weightdata', weightdata);
server.use('/heartdata', heartdata);

module.exports = { server };