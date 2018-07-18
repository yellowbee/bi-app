/**
 * Created by bhuang on 2/22/18.
 */

import React, {Component} from 'react';
import RadioButton from './RadioButton';
import '../../css/radio-button.scss';

//class RadioButtonGroup extends Component {
const radioButtonGroup = ({buttonList}) => {
        return (
            <ul>
                {buttonList.map((button, i) => {
                    return <RadioButton {...button} key={button.id}/>
                })}
            </ul>
        )
};

export default radioButtonGroup;
