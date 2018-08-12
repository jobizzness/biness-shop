/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image';
import '@polymer/iron-icon';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import { Media } from "../core/media.js";

class MediaUploader extends PolymerElement {

  static get properties() { return {
    image:{
      type: String,
      reflectToAttribute: true,
      notify: true
    },
    images:{
      type: Array,
      notify: true
    }
  }}

  static get template(){
    return html`
    <style>
      :host{
        display: block;
      }
      .main{
        width: 100%;
        height: 360px;
        background-color: black;
        cursor: pointer
      }
      .main>div{
          background-color: #eee;
          width: 100%;
          height: 100%;
          position: relative;
      }
      .placeholder{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      iron-icon{
        --iron-icon-height: 85px;
        --iron-icon-width: 85px;
        
      }
      input{
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        top:0;
        bottom: 0;
        left:0;
        right:0;
      }
      .main:hover>div{
          opacity: .9;
      }
      [hidden]{
        display: none;
      }
    </style>
    <div class="inner">
      <div class="main">
          <div>
              <input type="file" on-change="_fileChanged">
              <div class="placeholder" hidden="[[image]]">
                  <iron-icon src="/assets/icons/media.svg"></iron-icon>
              </div>
              <template is="dom-if" if="[[image]]">
                <iron-image 
                    style="width:100%; height:100%; background-color: lightgray;"
                    sizing="cover"
                    preload 
                    src="[[image]]"></iron-image>
              </template>
          </div>
      </div>
      <div class="list">
        <template is="dom-repeat" items="[[images]]">
          <div>
          
          </div>
        </template>
      </div>
      <vaadin-upload 
        id="vaadin"
        target="[[target]]" 
        method="POST" 
        timeout="300000" 
        headers="[[headers]]" 
        form-data-name="file"></vaadin-upload>
    </div>
    `;
  }

  get target(){
    return Media.getTarget()
  }

  get headers(){
    return Media.getHeaders()
  }
  /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
  _fileChanged(e){
    this.$.vaadin._addFile(e.target.files[0])
  }

  _makeUpload(file){

    uploader.then(this._onComplete.bind(this))
  }

  _progressChanged(snapshot){
    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    this.progress = percentage;
  }

  _onComplete(){

  }

  _onError(err){
    alert(err)
  }

  
}

window.customElements.define('remi-media-uploader', MediaUploader);
