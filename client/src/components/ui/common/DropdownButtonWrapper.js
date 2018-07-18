import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import '../../../../css/common/DropdownButtonWrapper.scss';

export default class DropdownButtonWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = (event, index, value) => this.setState({value});
    }

    render() {
        return (
            <DropdownButton
                bsStyle="default"
                title={this.props.title}
            >
                { this.props.menuItems.map((item, i) =>
                    <MenuItem eventKey={i}>{item}</MenuItem>
                )}
            </DropdownButton>
        );
    }
}