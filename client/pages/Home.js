import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../store/actions/posts';

const Posts = props => {
    let posts = props.posts.map((post, index) => (<li key={index} >{post.title}</li>));
    return (<ul>{posts}</ul>)
}

class Home extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getPosts();
    }

    render(){
        return (<div>
            <h1>Home Page</h1>
            <Posts posts={this.props.posts} />
        </div>);
    };
}

const mapStateToProps = ({posts}) => ({ posts });

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);