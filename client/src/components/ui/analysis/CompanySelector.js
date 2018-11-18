import React, { Component } from "react";
import { connect } from "react-redux"
import Select from "react-select";
import {setShareList} from "../../../actions/action_share_list";
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
import Spinner from "../../ui/common/Spinner";

class CompanySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(selectedLabel, dataUrl) {
    this.setState({ selected: selectedLabel, spinner: true });
    axios
      .get(dataUrl)
      .then(response => {
        console.log(response);
        this.setState({ options: response.data, spinner: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    let {shareList} = this.props.state;
    if (shareList.label) {
      this.clickHandler(shareList.label, shareList.url);
    } else {
      this.clickHandler("A", "https://bi-ws.herokuapp.com/api/idx-a");
    }
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
                          this.props.setShareList({label: "A", url: "https://bi-ws.herokuapp.com/api/idx-a"});
                          this.clickHandler("A", "https://bi-ws.herokuapp.com/api/idx-a");
                        }}
                      >
                        全部a股
                      </li>
                      <li
                        className={
                          this.state.selected === "SH-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "SH-A", url: "https://bi-ws.herokuapp.com/api/idx-sh-a"});
                          this.clickHandler("SH-A", "https://bi-ws.herokuapp.com/api/idx-sh-a");
                        }}
                      >
                        上证a股
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "SZ-A", url: "https://bi-ws.herokuapp.com/api/idx-sz-a"})
                          this.clickHandler("SZ-A", "https://bi-ws.herokuapp.com/api/idx-sz-a");
                        }}
                      >
                        深证a股
                      </li>
                      <li
                        className={
                          this.state.selected === "STARTUP" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "STARTUP", url: "https://bi-ws.herokuapp.com/api/idx-startup"});
                          this.clickHandler("STARTUP", "https://bi-ws.herokuapp.com/api/idx-startup");
                        }}
                      >
                        创业板
                      </li>
                      <li
                        className={
                          this.state.selected === "MD-SM" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "MD-SM", url: "https://bi-ws.herokuapp.com/api/idx-md-sm"});
                          this.clickHandler("MD-SM", "https://bi-ws.herokuapp.com/api/idx-md-sm");
                        }}
                      >
                        中小企业板
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-MAIN-A" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "SZ-MAIN-A", url: "https://bi-ws.herokuapp.com/api/idx-sz-main-a"});
                          this.clickHandler("SZ-MAIN-A", "https://bi-ws.herokuapp.com/api/idx-sz-main-a");
                        }}
                      >
                        深圳主板a股
                      </li>
                      <li
                        className={
                          this.state.selected === "B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "B", url: "https://bi-ws.herokuapp.com/api/idx-b"});
                          this.clickHandler("B", "https://bi-ws.herokuapp.com/api/idx-b");
                        }}
                      >
                        全部b股
                      </li>
                      <li
                        className={
                          this.state.selected === "SH-B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "SH-B", url: "https://bi-ws.herokuapp.com/api/idx-sh-b"});
                          this.clickHandler("SH-B", "https://bi-ws.herokuapp.com/api/idx-sh-b");
                        }}
                      >
                        上证b股
                      </li>
                      <li
                        className={
                          this.state.selected === "SZ-B" ? "selected" : ""
                        }
                        onClick={e => {
                          this.props.setShareList({label: "SZ-B", url: "https://bi-ws.herokuapp.com/api/idx-sz-b"});
                          this.clickHandler("SZ-B", "https://bi-ws.herokuapp.com/api/idx-sz-b");
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
                { this.state.spinner &&
                    <div style={{position: "relative", top: "-300px", left: "70px"}}>
                <Spinner/>
                    </div>
                }
            </div>
            <div className="col-md-6">
              <div className="home-panel-title">
                <h6>查询</h6>
              </div>
              <Select
                //filterOptions={filterOptions}
                menuIsOpen={true}
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

let mapStateToProps = state => ({
  state: state
});

let mapDispatchToProps = dispatch => ({
  setShareList: value => {
    dispatch(setShareList(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelector);
