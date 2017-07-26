import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component{
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  };

  handleDeleteClick(){
    this.props.deletePost(this.props.params.id)
    .then((value) => {
      this.context.router.push('/');
    })
  };

  render(){
    const { post } = this.props;
    if(!post){
      return <div>Loading..</div>;
    };

    return(
      <div>
        <h3>{post.title}</h3>
        <p>{post.category}</p>
        <p>{post.content}</p>
        <Link to="/" className="btn btn-primary">Back To Index</Link>
        <button style={{ marginLeft: 10 }} className="btn btn-danger" onClick={this.handleDeleteClick.bind(this)}>Delete Post</button>
      </div>

    );
  }
};

function mapStateToProps(state){
  return {
    post: state.posts.post
  };
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchPost,
    deletePost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
