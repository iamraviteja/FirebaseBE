const express = require('express');
const { db } = require('./utils/admin');

/**
 *  router imports
 */
const posts = require('./routes/posts');
const auth = require('./routes/authentication');
const chatbot = require('./routes/chatbot');

const server = express();

/**
 *  Use routes
 */
server.use('/posts', posts);
server.use('/auth', auth);
server.use('/chat', chatbot);

module.exports = { server };