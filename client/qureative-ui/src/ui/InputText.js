/**
 * Created by bhuang on 2/25/18.
 */
import React, { Component } from "react";
import "../../css/input-text.scss";

class InputText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { style, type, textValue, changeText, placeholder, name } = this.props;
    return (
      <div className="input-text">
        <input
            style={style}
          type={type}
          name={name}
          placeholder={placeholder}
          value={textValue}
          onChange={(e) => {
            changeText(name, e.target.value);
          }}
        />
      </div>
    );
  }
}

export default InputText;
