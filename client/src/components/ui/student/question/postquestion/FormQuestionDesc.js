/**
 * Created by bhuang on 2/24/18.
 */

import React, { Component } from "react";
import _ from "lodash";
import RadioButton from "../../../../../../qureative-ui/src/ui/RadioButton";
import RadioButtonGroup from "../../../../../../qureative-ui/src/ui/RadioButtonGroup";
import DropdownList from "../../../../../../qureative-ui/src/ui/DropdownList";
import SimpleDropdownList from "../../../../../../qureative-ui/src/ui/SimpleDropdownList";
import InputText from "../../../../../../qureative-ui/src/ui/InputText";
import EditPanel from "../../../common/EditPanel";
import {
  getQuestionTypeButtons,
  getThumbnailRadioButtons,
  getCategoryItems
} from "./form-question-desc-config";
import { connect } from "react-redux";
import "../../../../../../css/student/question/postquestion/FormQuestionDesc.scss";
import "../../../../../../qureative-ui/css/image.scss";
import "../../../../../../qureative-ui/css/tag-group.scss";
import TextArea from "../../../../../../qureative-ui/src/ui/TextArea";
import Image from "../../../../../../qureative-ui/src/ui/Image";
import TagGroup from "../../../common/TagGroup";

//class FormQuestionDesc extends Component {
class FormQuestionDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.validator = this.validator.bind(this);
  }

  validator(formQuestion) {
    let errors = {};
    /*if (!formQuestion.qtype) {
      errors.qtype = "Choose a question type";
    }
    if (!formQuestion.categories) {
      errors.categories = "Choose a Category";
    }
    if (!formQuestion.qname) {
      errors.qname = "Give your question a title";
    }
    if (!formQuestion.qDesc) {
      errors.qDesc = "Add at least one block of text";
    }
    if (_.isEmpty(formQuestion.qTags) || formQuestion.qTags.length <= 0) {
      errors.qTags = "Add at least one tag";
    }*/

    return errors;
  }

  render() {
    return (
      <div>
        {/*<div className="form-field">
          <h4 className="field-title">Question Type</h4>
          <RadioButtonGroup buttonList={buttonList} />
          <div style={{ color: "red" }}>
            {this.state.errors &&
              !formQuestion.qtype &&
              this.state.errors.qtype}
          </div>
        </div>*/}

        <div className="form-field">
          <h4 className="field-title">Creative Category</h4>
          <SimpleDropdownList
            title={
              (this.props.qDesc && this.props.qDesc.category) || "Category"
            }
            itemList={["Art", "Design"]}
            setCategory={this.props.setCategory}
          />
          <div style={{ color: "red" }}>
            {this.props.errors &&
              this.props.errors.category}
          </div>
        </div>

        <div className="form-field">
          <h4 className="field-title">Question Name</h4>
          <div className="qname-wrapper">
            <div className="input-text">
              <input
                type="text"
                placeholder="Put the question title here"
                value={this.props.qDesc && this.props.qDesc.title}
                onChange={e => {
                  this.props.setQuestionTitle(e.target.value);
                }}
              />
            </div>
            <div style={{ clear: "both" }} />
          </div>
          <div style={{ color: "red" }}>
            {this.props.errors &&
              this.props.errors.title}
          </div>
        </div>

        {/*this.state.editBlocks.map((block) => (
                    <TextArea placeholder={block}/>
                ))*/}
        {this.props.qDesc.qContent &&
          this.props.qDesc.qContent.map((block, i) => {
            if (block.type === "text") {
              return (
                <div className="text-area" style={{ width: "100%" }}>
                  <textarea
                    className="qDesc-textarea"
                    rows="4"
                    placeholder="Describe your question"
                    value={block.value}
                    onChange={e => {
                      this.props.updateTextBlock(block.id, e.target.value);
                    }}
                  />
                  <span
                    className="x-btn"
                    onClick={() => {
                      this.props.deleteTextBlock(block.id);
                    }}
                  >
                    X
                  </span>
                </div>
              );
            } else if (block.type === "image") {
              return (
                <div className="qDesc-image">
                  <img src={block.imgUrl} />
                  <div
                    className="circle-cross"
                    onClick={() => {
                      this.props.deleteImageBlock(block.id, block.publicId);
                    }}
                  >
                    X
                  </div>
                </div>
              );
            }
          })}

        <div className="panel">
          <div className="panel-container">
            <EditPanel
              name="qDesc"
              addTextBlock={this.props.addTextBlock}
              addImageBlock={this.props.addImageBlock}
            />
          </div>
        </div>
        <div style={{ color: "red" }}>
          {this.props.errors && this.props.errors.qContent}
        </div>

        {/*<div className="form-field">
          <h4 className="field-title">Add thumbnail image</h4>
          <RadioButtonGroup buttonList={thumbnailRadioButtonList} />
        </div>*/}

        <div className="form-field">
          <h4 className="field-title">Add Search Keywords</h4>
          {/*<TagGroup
            name="qTags"
            formQuestion={formQuestion}
            addTag={addTag}
            deleteTag={deleteTag}
          />*/}
          <div className="tag-group">
            <div className="input-text-wrapper">
              <div className="input-text">
                <input
                  type="text"
                  placeholder="Hit Enter to add a new tag"
                  value={this.state.curTag}
                  onChange={e => {
                    this.setState({curTag: e.target.value})
                  }}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        this.props.addTag(this.state.curTag);
                        this.setState({curTag: ''});
                    }
                  }}
                />
              </div>
            </div>
              {/*<div
              className="tag-btn"
              onClick={() => {
                this.props.addTag(this.state.curTag);
                this.setState({curTag: ''})
              }}
            >
              + Add
            </div>*/}
            <div className="tag-pool">
              {this.props.qDesc.tags &&
                this.props.qDesc.tags.map((tag, i) => {
                  return (
                    <div className="q-tag" key={i}>
                      {tag}
                      <span
                        className="x-btn"
                        onClick={() => this.props.deleteTag(tag)}
                      >
                        &nbsp;&nbsp;&nbsp;x
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div style={{ color: "red" }}>
            {this.props.errors &&
              this.props.errors.tags}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(FormQuestionDesc);
//export default FormQuestionDesc;
