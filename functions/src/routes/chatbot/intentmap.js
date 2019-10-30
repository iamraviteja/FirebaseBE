module.exports = {
    "GET_POSTS" : function(agent, result){
        return function(agent, result){
            console.log(result);
            agent.add('get the user posts');
        }
    }
};