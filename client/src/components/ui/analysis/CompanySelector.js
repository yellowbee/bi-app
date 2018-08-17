import React, { Component } from "react";
import Select from "react-select";
import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from "react-accessible-accordion";
import options from "../../shanghai-a-share";
import createFilterOptions from "react-select-fast-filter-options";
// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import HandyNav from "../nav/HandyNav";

class CompanySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                                        <div>全部a股</div>
                                        <div>上证a股</div>
                                        <div>深证a股</div>
                                        <div>创业板</div>
                                        <div>中小企业板</div>
                                        <div>深圳主板a股</div>
                                        <div>全部b股</div>
                                        <div>上证b股</div>
                                        <div>深证b股</div>
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
                                options={options}
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
                            <HandyNav/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanySelector;
