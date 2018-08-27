import React, { Component } from "react";
import Select from "react-select";
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemTitle
} from "react-accessible-accordion";
//import options from "../../shanghai-a-share";
import createFilterOptions from "react-select-fast-filter-options";
// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import HandyNav from "../nav/HandyNav";
import axios from "axios";

class CompanySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div>选定公司</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="home-panel-title">
                <h6>分类查询</h6>
              </div>
              <Accordion>
                <AccordionItem expanded={true}>
                  <AccordionItemTitle>
                    <h6>股票市场分类</h6>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <ul className="cs-list">
                      <li
                        className={
                          this.state.selected === "A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "A" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-a`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        全部a股
                      </li>
                      <li
                        className={
                          this.state.selected === "SH-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "SH-A" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-sh-a`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        上证a股
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "SZ-A" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-sz-a`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        深证a股
                      </li>
                      <li
                        className={
                          this.state.selected === "STARTUP" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "STARTUP" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-startup`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        创业板
                      </li>
                      <li
                        className={
                          this.state.selected === "MD-SM" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "MD-SM" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-md-sm`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        中小企业板
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-MAIN-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "SZ-MAIN-A" });
                          axios
                            .get(
                              `https://bi-ws.herokuapp.com/api/idx-sz-main-a`
                            )
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        深圳主板a股
                      </li>
                      <li
                        className={
                          this.state.selected === "B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "B" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-b`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        全部b股
                      </li>
                      <li
                        className={
                          this.state.selected === "SH-B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "SH-B" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-sz-b`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        上证b股
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.setState({ selected: "SZ-B" });
                          axios
                            .get(`https://bi-ws.herokuapp.com/api/idx-sh-b`)
                            .then(response => {
                              console.log(response);
                              this.setState({ options: response.data });
                            })
                            .catch(err => {
                              console.log(err);
                            });
                        }}
                      >
                        深证b股
                      </li>
                    </ul>
                  </AccordionItemBody>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemTitle>
                    <h6>新三板</h6>
                  </AccordionItemTitle>
                  <AccordionItemBody className="third-plate-accord-body" />
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemTitle>
                    <h6>行业分类</h6>
                  </AccordionItemTitle>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="col-md-6">
              <div className="home-panel-title">
                <h6>查询</h6>
              </div>
              <Select
                //filterOptions={filterOptions}
                options={this.state.options}
                isMulti={true}
                isSearchable={true}
                placeholder={"搜索公司..."}
                onChange={this.props.handleChange}
                closeMenuOnSelect={false}
                className="home-select"
                defaultValue={this.props.defaultValue}
              />
            </div>
            <div className="col-md-3">
              <HandyNav />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanySelector;
