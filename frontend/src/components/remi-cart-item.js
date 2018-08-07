/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement } from '@polymer/lit-element';
import '@polymer/iron-image';
import './remi-color-swatch-input.js';
import './quantity-input.js';

class CartItem extends LitElement {

  static get properties() { return {
    data: Object
  }}

  _render(props){
    return html`
    <style>
      :host{
        display: block;
        padding: 16px;
        position: relative;
      }

      .inner{
        display: flex;
        align-items: center;
      }
      .media{
        width: 275px;
        height: 200px;
      }
      iron-image{
        width: 100%;
        height: 100%;
      }
      .info{
        padding: 024px;
      }
      .info>*{
        display: flex;
        margin: 12px 0;
      }
      .flex{
        flex: 1;
      }
      .center{
        align-items: center;
        justify-content: center;
      }
      .name{
        font-size: .5rem;
        text-decoration:none;
        color: #424242;
      }
      .name h1{
        font-weight: 500;
      }
      .price{
        font-weight: 600;
      }
      .delete-btn{
        position: absolute;
        top: 16px;
        right: 12px;
        color: #757575;
      }
      @media only screen and (max-device-width: 768px) and (min-device-width: 320px){
        remi-color-swatch-input{
            display: none;
        }
      }
      @media only screen and (max-device-width: 480px) and (min-device-width: 320px){
        .media{
          width: 275px;
          height: 100px;
        }
      }
    </style>
    <div class="inner">
      <div class="media">
        <iron-image 
              style="background-color: lightgray;" 
              sizing="cover" preload fade 
              src="${props.data.image}">
          </iron-image>
      </div>
      <div class="info flex">
        <div class="center">
          <a class="name" href$="/product/${props.data.slug}">
            <h1>${props.data.name}</h1>
          </a>
          <span class="flex"></span>
          <span class="price">$${props.data.price}</span>
        </div>
        <div>
            <!-- Color -->
            <remi-color-swatch-input readonly></remi-color-swatch-input>
            <!-- Quantity -->
            <quantity-input min="1" max="7" value$="${props.data.quantity}" on-value-change="${(e) => this._quantityChange(e)}"></quantity-input>
          <span class="flex"></span>
        </div>
      </div>
      <paper-icon-button 
        icon="bn-icons:close" 
        class="delete-btn"
        on-click="${(e) => this._delete(e)}"></paper-icon-button>
    </div>
    `;
  }

  _delete(e){
    this.dispatchEvent(new CustomEvent('delete', {detail: this.data}))
  }

  _quantityChange(){
    this.dispatchEvent(new CustomEvent('quantity-changed', { detail: this.data }))
  }

  
}

window.customElements.define('remi-cart-item', CartItem);
