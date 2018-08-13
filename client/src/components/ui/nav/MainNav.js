import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TreeMenuNode from "../../../components/widgets/TreeMenuNode";
import TreeMenuRoot from "../../../components/widgets/TreeMenuRoot";

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <TreeMenuRoot>
                    <TreeMenuNode nodeName="企业分析" expandAtOpen={true}>
                        <ul>
                            <li>
                                <NavLink activeClassName="selected" to="/home/main-shares">公司选定</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="selected" to="/home/param-query">公司指标查询与分析</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="selected" to="/home/param-prediction">自助式指标预测</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="selected" to="/home/accounting-info">企业会计信息质量</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="selected" to="/home/estimation">企业估值</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="selected" to="/home/report">一键报告生成</NavLink>
                            </li>
                        </ul>
                    </TreeMenuNode>
                    <ul>
                        <li>
                            <a href="#basic-info">我的</a>
                        </li>
                        <li>
                            <a href="#basic-info">资讯</a>
                        </li>
                        <li>
                            <a href="#basic-info">排行榜</a>
                        </li>
                        <li>
                            <a href="#basic-info">贴吧</a>
                        </li>
                    </ul>
                </TreeMenuRoot>
            </div>
        );
    }
}

export default MainNav;
