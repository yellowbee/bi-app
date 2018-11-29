import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PDFObject from "pdfobject";
import axios from "axios";
import { BI_API_ROOT_URL } from "../../../constants";

class AnalystReport extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let options = {
      pdfOpenParams: {view: "FitV"}
    };
    console.log(this.props.reportUrl);
    PDFObject.embed(this.props.reportUrl, "#pdf-example");
  }

  render() {
    return (
      <div className="pdf-viewer-container">
        <div id="navbar-top">
          <div className="home-logo">
            <span className="logo__circle" />
            <span className="logo__title">企业分析软件</span>
          </div>
        </div>
        <div>{ this.props.filename }</div>
        <div id="pdf-example"/>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  state: state
});

export default connect(
  mapStateToProps,
  null
)(AnalystReport);
