import React from 'react';
//import DropDownMenuWrapper from './DropDownMenuWrapper';
import DropdownButtonWrapper from './DropdownButtonWrapper';
import '../../../../css/common/DropDownFilter.scss';

const DropDownFilter = () => {
    let menuItems01 = ['Architecture', 'Art Direction', 'Branding', 'Fashion'];
    let menuItemsLan = ['English', 'Chinese'];
    let menuItemsPrice = ['$10-$20', '$20-$50'];
    let menuItemsPopularity = ['Most Appreciated', 'Most Viewed', 'Most Recent'];
    return (
        <div id="ddown-filter">
            <DropdownButtonWrapper title="Industry" menuItems={menuItems01}/>
            <DropdownButtonWrapper title="Language" menuItems={menuItemsLan}/>
            <DropdownButtonWrapper title="Price" menuItems={menuItemsPrice}/>
            <DropdownButtonWrapper title="Popularity" menuItems={menuItemsPopularity}/>
        </div>
    )
};

export default DropDownFilter;
