import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import PdfButton from "./widget/PdfButton";
import { BI_API_ROOT_URL } from "../../../constants";

class AnalystShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: []
    };
  }

  componentDidMount() {
    let myUploadWidget;
    document.getElementById("upload_widget_opener").addEventListener(
      "click",
      () => {
        myUploadWidget = cloudinary.openUploadWidget(
          {
            cloud_name: "qurimage",
            upload_preset: "my-preset",
            sources: ["local"],
            clientAllowedFormats: ["pdf"],
            language: "cn",
            text: {
              cn: {
                queue: {
                  title: "上传队列",
                  upload_more: "继续上传文件"
                },
                or: "或者",
                c_window_border: "拖拽文件至此",
                menu: {
                  files: "我的文件"
                },
                files: {
                  multi_text: "拖拽文件至此",
                  menu: {
                    browse: "打开本地文件"
                  }
                }
              }
            }
          },
          (error, result) => {
            if (result.event === "success") {
              console.log("result of uploading a file to Cloudinary");
              console.log(result);

              axios
                .post(`${BI_API_ROOT_URL}/api/report`, {
                  original_filename: result.info.original_filename,
                  file_url: result.info.secure_url
                })
                .then(response => {
                  console.log("AnalystShowcase:line55");
                  console.log(response);
                  let newReportList = this.state.reports;
                  newReportList.push({
                    _id: response.data._id,
                    original_filename: response.data.original_filename
                  });
                  this.setState({ reports: newReportList });
                  /*this.props.history.push(
                    "/question-pool/question-detail/" + response.data.result
                  );*/
                });
            }
          }
        );
      },
      false
    );

    axios
      .get(`${BI_API_ROOT_URL}/api/reports`)
      .then(response => {
        console.log("retrieved all reports");
        console.log(response);
        this.setState({ reports: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          分析师报告
        </div>
        <div className="showcase-panel">
          <div className="showcase-panel__btn-container">
            <a href="#" id="upload_widget_opener">
              <button className="bi-button">上传报告</button>
            </a>
          </div>
          <div className="showcase-panel__items">
            {this.state.reports &&
              this.state.reports.map((report, i) => {
                return (
                  <div className="analyst-showcase__item">
                    <PdfButton
                      title={report.original_filename}
                      id={report._id}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalystShowcase;
