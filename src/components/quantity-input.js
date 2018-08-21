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

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class QuantityInput extends PolymerElement {
    static get properties() {
        return {

        }
    }

    static get template(){
        return html `
        <style>
            :host { 
                display: block;
                max-width: 200px;
            }
            input{
                border: 0px;
                outline: 0px;
                background: transparent;
            }
            .quantity{
                display: flex;
            }
            input[type=text]{
                color: #393433;
                vertical-align: baseline;
                width: 30px;
                font-weight: 600;
                text-align: center;
                padding: 4px;
                background-color: #e6e6e6;
                border-radius: 62%;
            }
            input[type=button]{
                height: 35px;
                cursor: pointer;
                width: 90px;
                font-size: 14px;
                font-weight: 600;
                color: #717171;
            }
        </style>
        <div class="quantity">
            <input type="button" value="—" on-click="minus" class="qtyminus">
            <input type="text" name="Quantity" value="[[value]]" class="qty" readonly>
            <input type="button" value="+" class="qtyplus" on-click="plus">
        </div>
        `;
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            value: {
                type: Number,
                reflectToAttribute: true,
                notify: true,
                value: 1,
                observer: '_valueChanged'
            }    ,
            min: Number,
            max: Number
        }
    }

    _valueChanged(val){
        if(!val){
            this.value = 1;
        }
    }

    minus(e){
        if ((this.value - 1) < this.min) return;
        this.value--;
    }
    
    plus(e){
        if((this.value + 1) > this.max) return;
        this.value++;
    }
    
    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
    }
}

customElements.define('quantity-input', QuantityInput);