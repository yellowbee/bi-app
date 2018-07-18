/**
 * Created by bhuang on 2/28/18.
 */

import React, { Component } from "react";
import InputText from "../../../../qureative-ui/src/ui/InputText";
import "../../../../css/common/TagGroup.scss";

class TagGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.changeTagText = this.changeTagText.bind(this);
    this.clearTagText = this.clearTagText.bind(this);
  }

  changeTagText(name, value) {
    this.setState({ value: value });
  }

  clearTagText() {
    this.setState({ value: "" });
  }

  render() {
    let { name, formQuestion, addTag, deleteTag } = this.props;
    return (
      <div className="tag-group">
        <div>
          <div className="input-text-wrapper">
            <InputText
                type="text"
              placeholder="Add a new tag here"
              name="qTags"
              textValue={this.state.value}
              changeText={this.changeTagText}
            />
          </div>
          <div
            className="tag-btn"
            onClick={() => {
              addTag(name, this.state.value);
              this.clearTagText();
            }}
          >
            + Add
          </div>
        </div>
        <div className="tag-pool">
          {formQuestion.qTags &&
            formQuestion.qTags.map((tag, i) => {
              return (
                <div className="q-tag" key={i}>
                  {tag}
                  <span className="x-btn" onClick={() => deleteTag(name, i)}>&nbsp;&nbsp;&nbsp;x</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default TagGroup;
