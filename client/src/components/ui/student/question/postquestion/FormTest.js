/**
 * Created by bhuang on 2/19/18.
 */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostsNew extends Component {
    /**
     * This is the callback function that will be called by <Field>
     *
     * @param field property object passed from <Field>
     * @returns {*}
     */
    renderField(field) {
        return (
            <div className="form-group has-danger">
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {/* a redux form field can be in one of a set of states;
                     touched means having worked on a field and now blurring away
                     */}
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        );
    }

    /**
     * Callback function to pass to onSubmit so that when the form data
     * looks good, redux form will call this callback function.
     *
     * @param values
     */
    onSubmit(values) {
        console.dir("values passed from form to onSubmit callback: " + values.title);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" name="title" component={this.renderField} />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

/**
 * Callback function
 * @param values
 */
function validate(values) {
    // console.log(values) -> {title: 'foo', categories: 'bar', content: 'blabla'}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // if errors is empty, the form is fine to submit
    return errors;
}

// Here reduxFrom is a function that can be
// thought of being similar to the redux function
// connect.
export default reduxForm({
    validate: validate,
    form: "PostsNewForm" // the name of the form, which should be unique
})(PostsNew);
