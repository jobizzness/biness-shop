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
import { PageViewElement } from "../../components/page-view-element";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { MDCRipple } from '@material/ripple';

import { store } from '../../store.js';
import template from './template.html';
import '../../components/remi-checkout.js';
import '../../components/remi-cart-item.js';
import { removeFromCart } from '../../actions/cart.js';
import { InjectGlobalStyle } from '../../core/utils.js';

//Imports lazy global styles
InjectGlobalStyle({ name: 'remi-cart' }, () => import('./style.html'));
InjectGlobalStyle({ name: 'material-button' }, () => import('../../components/material/button.html'));
InjectGlobalStyle({ name: 'material-textfield' }, () => import('../../components/material/textfield.html'));

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiCart extends connect(store)(PageViewElement) {


    static get template() {
        return html([
            template
        ]);
    }

    _delete(e){
        let product = e.target.data;
        if (product){
            store.dispatch(removeFromCart(product, this.user != null))
        }
        //handle it
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

    _checkout(){
        window.scrollTo(0, 0);
        this.$.checkoutComponent.open();
    }
    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        const buttonRipple = new MDCRipple(this.querySelector('.mdc-button'));
    }

    _stateChanged(state){
        this.total = state.shop.cart.total;
        this.numItems = state.shop.cart.numItems;
        this.items = state.shop.cart.items;
        this.user = state.app.user;
    }
}

customElements.define('remi-cart', RemiCart);