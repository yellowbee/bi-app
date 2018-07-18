/**
 * Question form for a user to post a new question.
 * Created by bhuang on 2/18/18.
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import axios from "axios";
import _ from 'lodash';
import FormQuestionDesc from "./FormQuestionDesc";
import FormTest from "./FormTest";
import { API_ROOT_URL } from "../../../../../../src/constants";
import "../../../../../../css/student/question/postquestion/FormQuestion.scss";

class FormQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: {
        qDesc: true,
        price: false
      },
      qDesc: {}
    };

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
    let curQ = this.state.qDesc;
    this.setState({qDesc: {...curQ, category}});
  }

  setQuestionTitle(title) {
      let curQ = this.state.qDesc;
      this.setState({qDesc: {...curQ, title}});
  }

  addTextBlock() {
    let curQ = this.state.qDesc;
    let qContent = this.state.qDesc.qContent ? this.state.qDesc.qContent : [];
    qContent.push({id: uuidv1(), type: "text"});
    this.setState({qDesc: {...curQ, qContent}});
  }

  deleteTextBlock(id) {
      let curQ = this.state.qDesc;
      let qContent = this.state.qDesc.qContent.filter(block => block.id !== id);
      this.setState({qDesc: {...curQ, qContent}});
  }

  updateTextBlock(id, value) {
      let curQ = this.state.qDesc;
      let qContent = this.state.qDesc.qContent.map((block) => {
        if (block.id === id) {
          block.value = value;
        }
        return block;
      });
      this.setState({qDesc: {...curQ, qContent}});
  }

  addImageBlock(publicId, imgUrl) {
      let curQ = this.state.qDesc;
      let qContent = this.state.qDesc.qContent ? this.state.qDesc.qContent : [];
      qContent.push({id: uuidv1(), type: "image", imgUrl, publicId});
      this.setState({qDesc: {...curQ, qContent}});
  }

  deleteImageBlock(id, publicId) {
          axios.delete(`${API_ROOT_URL}/api/image/${publicId}`).then(() => {
              let curQ = this.state.qDesc;
              let qContent = this.state.qDesc.qContent.filter(block => block.id !== id);
              this.setState({qDesc: {...curQ, qContent}});
          });
  }

  addTag(tag) {
      if (_.isEmpty(tag)) return;

      let curQ = this.state.qDesc;
      let tags = this.state.qDesc.tags ? this.state.qDesc.tags : [];
      tags.push(tag.trim());
      this.setState({qDesc: {...curQ, tags}});
  }

  deleteTag(value) {
      let curQ = this.state.qDesc;
      let tags = this.state.qDesc.tags.filter(tag => tag !== value);
      this.setState({qDesc: {...curQ, tags}});
  }

    validator() {
        let errors = {};
         if (!this.state.qDesc.category) {
            errors.category = "Choose a Category";
         }
        if (!this.state.qDesc.title) {
            errors.title = "Give your question a title";
         }
        if (_.isEmpty(this.state.qDesc.qContent)) {
            errors.qContent = "Add at least one block of text";
         }
         if (_.isEmpty(this.state.qDesc.tags)) {
            errors.tags = "Add at least one tag";
         }

        return errors;
    }

  render() {
    console.log('current question state: ');
    console.log(this.state.qDesc);

    return (
      <div className="form-link">
        <ul>
          <li
            style={
              this.state.tabSelected.qDesc
                ? { borderBottom: "3px solid blue" }
                : null
            }
            onClick={() => {
              this.setState({ tabSelected: { qDesc: true, price: false } });
            }}
          >
            <a>1. Question description</a>
          </li>
          <li
            style={
              this.state.tabSelected.price
                ? { borderBottom: "3px solid blue" }
                : null
            }
            onClick={() => {
              this.setState({ tabSelected: { qDesc: false, price: true } });
            }}
          >
            <a>2. Deadline and price</a>
          </li>
        </ul>

        {this.state.tabSelected.qDesc && (
            <form onSubmit={e => {
                e.preventDefault();
                let errors = this.validator();
                if (_.isEmpty(errors)) {
                    console.log("Form data validation passed: " + errors);
                    let question = { data: {} };
                    question.data.title = this.state.qDesc.title;
                    question.data.location = "USA";
                    question.data.category = this.state.qDesc.category;
                    question.data.tags = this.state.qDesc.tags;
                    question.data.userName = this.props.auth.userName;
                    question.data.fullName = this.props.auth.fullName;
                    question.data.description = this.state.qDesc.qContent;

                    let qImage = null;
                    for (let i=0; i<this.state.qDesc.qContent.length; i++) {
                        if (this.state.qDesc.qContent[i].type === 'image') {
                            qImage = this.state.qDesc.qContent[i].imgUrl;
                            break;
                        }
                    }
                    question.data.qImage = qImage ? qImage : "/images/graphic-design.png";

                    question.data.profileImg = this.props.auth.avatar;
                    question.data.price = "80";
                    //postQuestion(question, response => {
                    //    console.log(response);
                    //    this.props.history.push(
                    //        "/question-pool/question-detail/" + response.data.result
                    //    );
                    //});
                    axios
                        .post(`${API_ROOT_URL}/api/question`, question)
                        .then(response => {
                            console.log(response);
                            this.props.history.push(
                                "/question-pool/question-detail/" + response.data.result
                            );
                        });
                } else {
                    console.log("Form data validation failed: " + errors);
                    this.setState({errors})
                }
            }}>
                <FormQuestionDesc qDesc={this.state.qDesc}
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
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps, null)(FormQuestion));
