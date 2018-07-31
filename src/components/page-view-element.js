/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/polymer/polymer-element.js';

import { lightComponent } from './lightComponent';
export class PageViewElement extends lightComponent {

  static get properties() {
    return {
      selected: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
      active: {
        type: Boolean,
        reflectToAttribute: true,
        value: false
      },
    }
  }

  show() {
    this.active = true;
  }

  hide() {
    this.active = false;
  }

  ready() {
    super.ready();

    //Play animation when page is loaded
    if (this.start && typeof this.show === "function") {
      this.show();
    }

  }
  
  _userIsAdmin(user){
    return user && user.roles && user.roles.admin
  }

}