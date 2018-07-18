import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 200,
    },
};

export default class DropDownMenuWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = (event, index, value) => this.setState({value});
    }

    render() {
        let clsName = 'styled-menu';
        return (
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                    className={clsName}
                >

                    {this.props.menuItems.map((item, i) =>
                        <MenuItem value={i} primaryText={item}/>
                    )}
                </DropDownMenu>
        );
    }
}