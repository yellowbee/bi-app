/**
 * Created by bhuang on 4/27/18.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import _ from "lodash";
import axios from "axios";
import { API_ROOT_URL } from "../../../../../../src/constants";
import FormProjectDesc from "./FormProjectDesc";
import "../../../../../../css/student/project/postproject/FormProject.scss";

class FormProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setCategory = this.setCategory.bind(this);
    this.setQuestionTitle = this.setQuestionTitle.bind(this);
    this.addTextBlock = this.addTextBlock.bind(this);
    this.deleteTextBlock = this.deleteTextBlock.bind(this);
    this.updateTextBlock = this.updateTextBlock.bind(this);
    this.addImageBlock = this.addImageBlock.bind(this);
    this.deleteImageBlock = this.deleteImageBlock.bind(this);
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.validator = this.validator.bind(this);
  }

  setCategory(category) {
    this.setState({ category });
  }

  setQuestionTitle(title) {
    this.setState({ title });
  }

  addTextBlock() {
    let content = this.state.content ? this.state.content : [];
    content.push({ id: uuidv1(), type: "text" });
    this.setState({ content });
  }

  deleteTextBlock(id) {
    let content = this.state.content.filter(block => block.id !== id);
    this.setState({ content });
  }

  updateTextBlock(id, value) {
    let content = this.state.content.map(block => {
      if (block.id === id) {
        block.value = value;
      }
      return block;
    });
    this.setState({ content });
  }

  addImageBlock(publicId, imgUrl) {
    let content = this.state.content ? this.state.content : [];
    content.push({ id: uuidv1(), type: "image", imgUrl, publicId });
    this.setState({ content });
  }

  deleteImageBlock(id, publicId) {
    axios.delete(`${API_ROOT_URL}/api/image/${publicId}`).then(() => {
      let content = this.state.content.filter(block => block.id !== id);
      this.setState({ content });
    });
  }

  addTag(tag) {
    if (_.isEmpty(tag)) return;

    let tags = this.state.tags ? this.state.tags : [];
    tags.push(tag.trim());
    this.setState({ tags });
  }

  deleteTag(value) {
    let tags = this.state.tags.filter(tag => tag !== value);
    this.setState({ tags });
  }

  validator() {
    let errors = {};
    if (!this.state.category) {
      errors.category = "Choose a Category";
    }
    if (!this.state.title) {
      errors.title = "Give your question a title";
    }
    if (_.isEmpty(this.state.content)) {
      errors.content = "Add at least one block of text";
    }
    if (_.isEmpty(this.state.tags)) {
      errors.tags = "Add at least one tag";
    }

    return errors;
  }

  render() {
    /*let {
      formProject,
      setProjectCategories,
      setProjectName,
      addProjectTextBlock,
      deleteProjectTextBlock,
      setProjectTextBlockText,
      addProjectImage,
      deleteProjectImage,
      postProject
    } = this.props;

    let itemList = getCategoryItems(formProject, setProjectCategories);*/
    console.log(this.state);
    return (
      <form
        className="formproject"
        onSubmit={e => {
          e.preventDefault();

          let errors = this.validator();
          if (_.isEmpty(errors)) {
            console.log("Form data validation passed: " + errors);
            let project = { data: {} };
            project.data.title = this.state.title;
            project.data.category = this.state.category;
            project.data.tags = this.state.tags;
            project.data.userName = this.props.auth.userName;
            project.data.description = this.state.content;

            let qImage = null;
            for (let i = 0; i < this.state.content.length; i++) {
              if (this.state.content[i].type === "image") {
                qImage = this.state.content[i].imgUrl;
                break;
              }
            }
            project.data.pImage = qImage
              ? qImage
              : "/images/graphic-design.png";

            axios
              .post(`${API_ROOT_URL}/api/project`, project)
              .then(response => {
                console.log(response);
                this.props.history.push(
                  "/project-detail/" + response.data.result
                );
              });
          } else {
            console.log("Form data validation failed: " + errors);
            this.setState({ errors });
          }

          /*postProject(project, response => {
            //console.log(response);
            this.props.history.push(
              "/project-detail/" + response.data.result
            );
          });*/
        }}
      >
        <FormProjectDesc
          pDesc={this.state}
          errors={this.state.errors}
          setCategory={this.setCategory}
          setQuestionTitle={this.setQuestionTitle}
          addTextBlock={this.addTextBlock}
          deleteTextBlock={this.deleteTextBlock}
          updateTextBlock={this.updateTextBlock}
          addImageBlock={this.addImageBlock}
          deleteImageBlock={this.deleteImageBlock}
          addTag={this.addTag}
          deleteTag={this.deleteTag}
        />

        <button className="qform-btn" type="submit">
          <span>Submit</span>
        </button>
      </form>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(FormProject);
