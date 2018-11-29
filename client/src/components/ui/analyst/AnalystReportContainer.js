import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PDFObject from "pdfobject";
import axios from "axios";
import { BI_API_ROOT_URL } from "../../../constants";
import AnalystReport from "./AnalystReport";

class AnalystReportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('Route params: ' + this.props.match.params.id);

    axios
      .get(`${BI_API_ROOT_URL}/api/report/${this.props.match.params.id}`)
      .then(response => {
        console.log('get file object: ');
        console.log(response);
        this.setState({report_url: response.data.file_url, filename: response.data.original_filename});
      })
      .catch(err => {
        console.log(err);
      });
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
        <Link to="/home/info"><span className="pdf-viewer-container__return">&#60; &nbsp; 返回</span></Link>
        {this.state.report_url && <AnalystReport reportUrl={this.state.report_url} filename={this.state.filename}/>}
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
)(AnalystReportContainer);
