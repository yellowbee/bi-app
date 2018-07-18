/**
 * Work experience section of Edit Profile
 * Created by bhuang on 6/17/18.
 */

import React, { Component } from "react";
import "../../../../../css/profile/EditProfileContactMethod.scss";

class EditProfileContactMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="editprofile-title">Contact Method</div>
        <div className="editprofile-title editprofile-contact-prompt">
            Leave your contact methods to receive intime question inquire sms.
        </div>

        <div style={{ width: "100%" }}>
          <div className="input-text">
            <input type="text" placeholder="Phone Number" onChange={(e) => {
                let nextState = {...this.state, phone: e.target.value};
                this.props.updateContact(nextState);
                this.setState({phone: e.target.value});
            }}/>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileContactMethod;
