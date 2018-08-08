import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class CompanyPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let options = this.props.selection;
        return (
            <div>
                <div style={{marginBottom: "40px"}}>
                    <span>已选定公司 ({options.length}) &nbsp;&nbsp;&nbsp;</span>
                    <a href="javascript:;" onClick={this.props.handleBackToAddMore}>返回继续添加</a>
                </div>
                <Tabs>
                    <TabList>
                        {options.map((option) => {
                            return <Tab><span style={{fontSize: "0.8em"}}>{option.label} ({option.value})</span></Tab>
                        })}
                    </TabList>

                    {options.map((option) => {
                        return <TabPanel>这是{option.label}的分析</TabPanel>
                    })}
                </Tabs>
            </div>
        );
    }
}

export default CompanyPortfolio;
