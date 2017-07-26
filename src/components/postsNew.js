import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, initialize } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { createPost } from '../actions/index';

const renderField = ({label, input, meta: { touched, error }}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} type="text" className="form-control"/>
      {touched && error &&
       <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

const renderTextArea = ({label, input, meta: { touched, error }}) => {
  return (
  <div>
    <label>{label}</label>
    <textarea {...input} className="form-control"/>
    {touched && error &&
     <div className="alert alert-danger">{error}</div>}
  </div>
  );
};

class PostsNew extends Component {
  //inorder to navigate without the link tag, we need access to router which is available through the context property
  static contextTypes = {
    router: PropTypes.object  //access it from the parent component i.e - index.js
  };

  handleFormSubmit(formProps) {
    console.log(formProps);
    this.props.createPost(formProps)
    .then((value) => {
      //blogPost has been created, navigate the user to the index
      this.context.router.push('/');
    });
  };

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit= { handleSubmit(this.handleFormSubmit.bind(this)) }>
        <h3> Create New form </h3>
        <div className="form-group">
          <Field name="title" component={renderField} label="Title : " />
          </div>
        <div className="form-group">
          <Field name="categories" component={renderField} label="Categories : " />
        </div>
        <div className="form-group">
          <Field name="content" component={renderTextArea} label="Content : " />
        </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" style={{ marginLeft: 10}} className="btn btn-danger">Cancel New Post</Link>
      </form>
    );
  }
};


function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'Please enter a title';
  }

  if (!formProps.categories) {
    errors.categories = 'Please enter a category';
  }

  if (!formProps.content) {
    errors.content = 'Please enter some content';
  }

  return errors;
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    createPost
  }, dispatch);
};

const postsNewForm = reduxForm({
  form: 'PostsNewForm',
  validate
})(PostsNew);

export default connect(null, mapDispatchToProps)(postsNewForm);
