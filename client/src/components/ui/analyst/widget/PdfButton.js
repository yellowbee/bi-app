import React, { Component } from "react";
import { Link } from "react-router-dom";

class PdfButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    let { id } = this.props;

    return (
      <div className="pdf-btn">
        <div className="pdf-btn__img-container">
          <Link to={`/analyst-report/${id}`}>
            <img className="pdf-btn__img" src="/images/pdf-icon.jpg"/>
          </Link>
        </div>
        <div className="pdf-btn__title">
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default PdfButton;
