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
import { PageViewElement } from '../../components/page-view-element.js';
import '@polymer/iron-image';
import { MDCRipple } from '@material/ripple';
import { connect } from 'pwa-helpers/connect-mixin.js';

import template from './template.html'
import "../../components/biness-text.js";

import { store } from '../../store.js';
import "../../components/remi-product-item";
import { getProductListing, setActiveProduct } from "../../actions/shop.js";
import { InjectGlobalStyle} from '../../core/utils.js';

import { shop } from "../../reducers/shop.js";
import './style.html';

store.addReducers({
    shop
});

//Imports lazy global styles
InjectGlobalStyle({ name: 'remi-home' }, () => import('./style.html'));
InjectGlobalStyle({name: 'material-button'}, () => import('../../components/material/button.html'));

/**
 * `ts-home` Description
 *
 * @customElement
 * @polymer
 * @demo 
 * 
 */
class RemiHome extends connect(store)(PageViewElement) {
    

    static get template() {
        return html([
            template 
        ])
        
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            bestSellers:{
                type: Array
            }
        }
    }

    hide() {
        return new Promise(async (resolve, reject) => {
            //const animation = await fadeOut(this);
            this.active = false;
            resolve();
        })

    }

    show() {
        return new Promise(async (resolve, reject) => {
            this.active = true;
            //const animation = await fadeIn(this);
            resolve();
        })

    }

    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    _stateChanged(state) {
        this.user = state.app.user;
        this.bestSellers = state.shop.products;
        this.editMode = false;
    }

    _view(e) {
        let node = e.target;
        let data = node.data;

        store.dispatch(setActiveProduct(data));
    }
    
    connectedCallback(){
        super.connectedCallback();
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        store.dispatch(getProductListing());
        const buttonRipple = new MDCRipple(this.querySelector('.mdc-button'));
    }

}

customElements.define('remi-home', RemiHome);