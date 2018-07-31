/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement  } from '@polymer/lit-element';
import '@polymer/iron-image';
import buttonStyles from "./material/button.html";
import '@polymer/iron-icon';

class RemiProductItem extends LitElement {
    _render(props) {
        return html`
        ${html([buttonStyles])}
        <style>
            :host{
                display: block;
                background: #eee;
                height: 375px;
                position: relative;
                overflow: hidden;
            }
            :host([shadow]){
                box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
            }
            :host(:not([featured]))
             .cart-icon{
                display:none;
            }
            .product-media{
                width: 100%;
                height: calc(100% - 87px);
            }
            .wrapper, iron-image{
                width: 100%;
                height: 100%;
            }
            footer{
                position: absolute;
                bottom: 0px;
                width:100%;
                height: 105px;
                background: white;
            }
            .title{
                font-size: 1rem;
                font-weight: 600;
                color: #000000db;
                padding-bottom: 8px;
                margin: 0;
            }
            .price-tag{
                color: #d80b6d;
                font-size: 16px;
            }
            .flexed{
                display: flex;
            }
            .pad{
                padding: 1em;
            }
            button{
                color: white;
                border-radius: 25px !important;
                --mdc-theme-primary: var(--app-secondary-color);
            }
            .stats-item{
                margin-right: 12px;
                font-size: 12px;
                color: #5f5f5f;
            }
            .stats-item iron-icon{
                color: #bdbdbd;
                margin-right: 4px;
            }
            .stats{
                justify-content: center;
                align-items: center;
                margin-top: 12px;
            }
        </style>
            
        <div class="wrapper">
            <header></header>
            <div class="product-media">
                <iron-image 
                    style="background-color: lightgray;" 
                    sizing="cover" preload fade 
                    src$="${props.data.image}">
                </iron-image>
            </div>
            <footer>
                <div class="pad">
                    <h4 class="title">${props.data.name}</h4>
                   ${(props.forAdmin != true) 
                        ?
                        html`
                            <div class="flexed">
                                <span class="price-tag">$60.00</span>
                                <span style="flex:1"></span>
                                <button class="mdc-button mdc-button--dense mdc-button--raised"> 
                                    Add to Cart</button>
                            </div>` 
                        : 
                        html`
                            <div class="flexed stats">
                                <div class="stats-item">
                                    <iron-icon icon="bn-icons:cart"></iron-icon>
                                    <span>${props.data.sales_count} Sales</span>
                                </div>
                                <div class="stats-item">
                                    <iron-icon icon="bn-icons:eye"></iron-icon>
                                    <span>${props.data.views} Views</span>
                                </div>
                                <span style="flex:1"></span>
                                <div>
                                    <iron-icon icon="bn-icons:stats"></iron-icon>
                                </div>
                            </div>
                    `}
                    
                </div>
                
            </footer>
        </div>
        
    `;
    }

    static get properties() {
        return {
            title: String,
            forAdmin:{
                type: Boolean,
                reflectToAttribute: true
            },
            data: {
                type: Object,
                value: {}
            }
        }
    }

    constructor() {
        super();

    }

    _firstRendered() {

    }

    _didRender(properties, changeList) {

    }
}

window.customElements.define('remi-product-item', RemiProductItem);