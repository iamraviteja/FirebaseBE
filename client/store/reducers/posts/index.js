import { GET_POSTS } from '../../actions/action-types';


const posts = (state = [], action) =>{
    switch (action.type) {
        case GET_POSTS:
            return [...state, { title: 'hey got the poosts'}];
        default:
            return state;
    }
}

export default posts;