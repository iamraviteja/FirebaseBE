const { db } = require('../../utils/admin');

module.exports = {
    "GET_POSTS" : function(agent, result){
        return function(agent, result){
            agent.add(result);
        }
    },
    "GET_HEART_RATE": function(agent, result){
        return function(agent, result){
            //agent.add(result.parameters.healthattr.stringValue);
            agent.add('result.parameters.healthattr.stringValue');
        }
    }
};