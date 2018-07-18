/**
 * Created by bhuang on 2/25/18.
 */

import React, { Component } from "react";
import "../../../../css/common/EditPanel.scss";

class EditPanel extends Component {
  constructor(props) {
    super(props);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  // To enable image_search and dropbox, Google API key and dropbox app account need to be set up
    // "Powered by Cloudinary" can be removed from widget only for paid account
    /**
     * The returned result is an array of all uploaded images. Here there's only one image.
     * Most important field: secure_url, public_id
   [
     {
       access_mode: "public"
       bytes: 1223041
       created_at: "2018-03-03T11:40:44Z"
       etag: "3f7e85ed51b8553c96cfb29b41cd7164"
       format: "jpg"
       height: 1467
       original_extension: "jpeg"
       original_filename: "pexels-photo-210243"
       path: "v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       placeholder: false
       public_id: "q-image/qh0sr9hkjzzrzqzjjcnl"
       resource_type: "image"
       secure_url: "https://res.cloudinary.com/qurimage/image/upload/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       signature: "ce8ee0f3e1803acdff44f53b1a5b000a4b08916e"
       tags: ["tag1"]
       thumbnail_url: "http://res.cloudinary.com/qurimage/image/upload/c_limit,h_60,w_90/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       type:"upload"
       url: "http://res.cloudinary.com/qurimage/image/upload/v1520077244/q-image/qh0sr9hkjzzrzqzjjcnl.jpg"
       version: 1520077244
       width: 2201
     }
   ]
     */
  uploadWidget() {
    cloudinary.openUploadWidget(
      { cloud_name: "qurimage",
          upload_preset: "my-preset",
          tags: ["xmas"],
          sources: ['local', 'url'],
          theme: 'minimal',
          stylesheet: '#cloudinary-overlay { background-color: rgba(10,10,10,.7) !important; }'},
          (error, result) => {
          //console.log(result);
            this.props.addImageBlock(result[0].public_id, result[0].secure_url);
          }
    );
  }

  render() {
    let { name, addTextBlock, addImage } = this.props;
    return (
      <div className="edit-panel">
        <div className="btn-wrapper">
          <div
            className="edit-btn"
            onClick={() => {
              addTextBlock();
            }}
          />
          <div>Text</div>
        </div>
        <div className="btn-wrapper">
          <div
            className="edit-btn"
            onClick={() => {
              this.uploadWidget();
            }}
          />
          <div>Image</div>
        </div>
        <div className="btn-wrapper">
          <div className="edit-btn" onClick={() => {}} />
          <div>Video</div>
        </div>
      </div>
    );
  }
}

export default EditPanel;
