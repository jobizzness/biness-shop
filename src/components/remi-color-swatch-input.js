/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// This element is *not* connected to the redux store.
class RemiColorSwatchInput extends LitElement {
  _render(props) {
    return html`
      <style>
        .color-swatch{
          border-radius: 50%;
          display: inline-block;
          height: 1em;
          vertical-align: middle;
          width: 1em;
          cursor: pointer;
          padding: 6px;
          margin: 0 4px;
      }
      .colors{
        padding-bottom: 16px;
        margin-bottom: 1em;
      }
      </style>
     <div class="colors vertical-scroll">
          <span class="color-swatch" style="background: #3F51B5;"></span>
          <span class="color-swatch" style="background: #b96f55;"></span>
          <span class="color-swatch" style="background: #ff0057;"></span>
      </div>
    `;
  }

  static get properties() {
    return {
      name: String,
      amount: String,
      price: String
    }
  }
}

window.customElements.define('remi-color-swatch-input', RemiColorSwatchInput);
