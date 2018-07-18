/**
 * Basic information section of Edit Profile
 *
 * Created by bhuang on 6/14/18.
 */
import React, { Component } from "react";
import axios from "axios";
import { URL_ROOT } from "../../../../../src/actions/constants";
import Image from "../../../../../qureative-ui/src/ui/Image";
import SimpleDropdownList from "../../../../../qureative-ui/src/ui/SimpleDropdownList";
import "../../../../../qureative-ui/css/active-tag.scss";
import "../../../../../css/profile/EditProfileBasicInfo.scss";

class EditProfileBasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.uploadWidget = this.uploadWidget.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  /**
     * The returned result is an array of all uploaded images. Here there's only one image.
     * Most important field: secure_url, public_id
     [
     {
       public_id: "q-image/qh0sr9hkjzzrzqzjjcnl"
       secure_url: "https://res.cloudinary.com/qurimage/image/upload/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       url: "http://res.cloudinary.com/qurimage/image/upload/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       thumbnail_url: "http://res.cloudinary.com/qurimage/image/upload/c_limit,h_60,w_90/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
     }
     ]
     */
  uploadWidget() {
    if (this.state.profileIcon) {
      return;
    }

    cloudinary.openUploadWidget(
      {
        cloud_name: "qurimage",
        upload_preset: "my-preset",
        tags: ["xmas"],
        sources: ["local", "url"],
        theme: "minimal",
        stylesheet:
          "#cloudinary-overlay { background-color: rgba(10,10,10,.7) !important; }"
      },
      (error, result) => {
        console.log(result);
        this.setState({
          profileIcon: {
            imgUrl: result[0].thumbnail_url,
            publicId: result[0].public_id
          }
        });

        let nextState = {
            ...this.state,
            profileIcon: {
                imgUrl: result[0].thumbnail_url,
                publicId: result[0].public_id
            }
        };
        this.props.updateBasicInfo(nextState);
      }
    );
  }

  deleteImage(name, publicId) {
    axios.delete(`${URL_ROOT}/image/${publicId}`).then(() => {
      let nextState = {
          ...this.state,
          profileIcon: null
      };
      this.props.updateBasicInfo(nextState);

      this.setState({
          profileIcon: null
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="editprofile-title">Basic Information</div>
        <div className="editprofile-info-group">
          <div className="editprofile-info-upload-wrapper">
            <div
              onClick={() => {
                this.uploadWidget();
              }}
            >
              <div className="editprofile-info-upload">
                Upload a Profile Photo
              </div>
            </div>
            <div className="editprofile-info-thumbnail">
              {this.state.profileIcon && (
                <Image
                  key={this.state.profileIcon.publicId}
                  name="icon"
                  publicId={this.state.profileIcon.publicId}
                  imgUrl={this.state.profileIcon.imgUrl}
                  deleteImage={this.deleteImage}
                />
              )}
            </div>
          </div>
          <div className="editprofile-info-input-wrapper">
            <div className="input-text">
              <input type="text" placeholder="Full Name" onChange={(e) => {
                let nextState = {...this.state, fullName: e.target.value};
                // only stable status of this.state can be dependent, meaning
                // don't use this.state immediately after it is updated using setState()
                this.props.updateBasicInfo(nextState);
                this.setState({fullName: e.target.value});
              }}/>
              <input type="text" placeholder="Job Title" onChange={(e) => {
                  let nextState = {...this.state, jobTitle: e.target.value};
                  this.props.updateBasicInfo(nextState);
                  this.setState({jobTitle: e.target.value});
              }}/>
            </div>
          </div>
        </div>

        <div className="editprofile-info-group">
          <div className="active-tag">
            <div>
              <div className="input-text-wrapper">
                <div className="input-text">
                  <input placeholder="Language" />
                </div>
              </div>
              <div
                  className="tag-btn"
                  onClick={() => {
                  }}
              >
                + Add
              </div>
              <div style={{ clear: "both" }} />
            </div>
            <div className="tag-pool">
                {
                ['English', 'Chinese'].map((tag, i) => {
                    return (
                        <div className="q-tag" key={i}>
                            {tag}
                          <span className="x-btn" onClick={() => deleteTag(name, i)}>&nbsp;&nbsp;&nbsp;x</span>
                        </div>
                    );
                })}
            </div>
          </div>
        </div>

        <div className="editprofile-info-group">
          <div>Location</div>
          <div className="editprofile-info-dropdown">
            <SimpleDropdownList
              title={"City"}
              itemList={["San Francisco", "San Jose"]}
            />
          </div>
          <div className="editprofile-info-dropdown">
            <SimpleDropdownList title={"State"} itemList={["CA", "MI"]} />
          </div>
          <div className="editprofile-info-dropdown">
            <SimpleDropdownList title={"Country"} itemList={["CHN", "USA"]} />
          </div>
          <div style={{ clear: "both" }} />
        </div>

        <div className="editprofile-info-group">
          <div>Interest Creative Field</div>
          <div className="editprofile-info-dropdown">
            <SimpleDropdownList
              title={"Category"}
              itemList={["Art", "Design"]}
            />
          </div>
          <div className="editprofile-info-dropdown">
            <SimpleDropdownList title={"Subcategory"} itemList={["UX", "UI"]} />
          </div>
          <div style={{ clear: "both" }} />
        </div>

        <div className="editprofile-info-group">
          <div>Personal Website</div>
          <div className="input-text">
            <input type="text" placeholder="e.g. https://www.qureative.com" onChange={(e) => {
                let nextState = {...this.state, personalUrl: e.target.value};
                this.props.updateBasicInfo(nextState);
                this.setState({personalUrl: e.target.value});
            }}/>
          </div>
          <div style={{ clear: "both" }} />
        </div>

        <div className="editprofile-info-group">
          <div style={{width: "40%"}} className="side-by-side">
            <div className="input-text">
              <input type="text" placeholder="Gmail ID" onChange={(e) => {
                  let nextState = {...this.state, gmailId: e.target.value};
                  this.props.updateBasicInfo(nextState);
                  this.setState({gmailId: e.target.value});
              }}/>
            </div>
          </div>
          <div className="side-by-side">OR</div>
          <div style={{width: "40%"}} className="side-by-side">
            <div className="input-text">
              <input type="text" placeholder="Skype ID" onChange={(e) => {
                  let nextState = {...this.state, skypeId: e.target.value};
                  this.props.updateBasicInfo(nextState);
                  this.setState({skypeId: e.target.value});
              }}/>
            </div>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      </div>
    );
  }
}

export default EditProfileBasicInfo;
