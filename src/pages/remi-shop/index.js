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
import template from './template.html'
import '@polymer/iron-image';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../../store.js';
import "../../components/remi-product-item";
import buttonStyles from "../../components/material/button.html";
import { PageViewElement } from '../../components/page-view-element.js';
import { slideUp, slideDown } from '../../components/animation.js';
import { getProductListing, setActiveProduct, setEditingProduct } from "../../actions/shop.js";
import { InjectGlobalStyle } from '../../core/utils.js';

//Import lazy global style
InjectGlobalStyle({name: 'material-button'}, () => import('../../components/material/button.html'));
InjectGlobalStyle({ name: 'remi-shop' }, () => import('./style.html'));

import { shop } from "../../reducers/shop.js";

store.addReducers({
    shop
});

/**
 * `ts-home` Description
 *
 * @customElement
 * @polymer
 * @demo 
 * 
 */
class RemiShop extends connect(store)(PageViewElement) {
    
    static get template() {
        return html([
            template
        ])

    }

    static get observers(){
        return [
        ]
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            
        }
    }

    hide() {
        return new Promise(async (resolve, reject) => {
            const animation = await slideDown(this);
            this.active = false;
            resolve();
        })

    }

    show() {
        return new Promise(async (resolve, reject) => {
            this.active = true;
            const animation = await slideUp(this);
            resolve();
        })

    }

    _view(e){
        let node = e.target;
        let data = node.data;

        store.dispatch(setActiveProduct(data));
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

    _stateChanged(state){
        this.user = state.app.user;
        this.products = state.shop.products;
    }

    _create(e){
        store.dispatch(setEditingProduct({}))
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    async ready() {
        super.ready();

        
        store.dispatch(getProductListing())
        
    }
}

customElements.define('remi-shop', RemiShop);