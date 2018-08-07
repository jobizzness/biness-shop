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
import { MDCRipple } from '@material/ripple';
import '@polymer/iron-image';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

import { store } from '../../store.js';
import template from './template.html'
import { PageViewElement } from '../../components/page-view-element.js';
import SharedStyles  from '../../components/shared-styles.html';
import buttonStyles from "../../components/material/button.html";
import '../../components/remi-color-swatch-input.js';
import '../../components/quantity-input.js';

import { shop } from "../../reducers/shop.js";
import { getProductBySlug, setActiveProduct, productWasViewed, setEditingProduct } from "../../actions/shop.js";
import { addToCart} from '../../actions/cart.js';

import { fadeIn, fadeOut } from '../../components/animation.js';
import {InjectGlobalStyle } from '../../core/utils.js';

store.addReducers({
    shop
});

InjectGlobalStyle({ name: 'remi-product' }, () => import('./style.html'));
InjectGlobalStyle({ name: 'material-button' }, () => import('../../components/material/button.html'));
/**
 * `ts-home` Description
 *
 * @customElement
 * @polymer
 * @demo 
 * 
 */
class RemiProduct extends connect(store)(PageViewElement) {
    

    static get template() {
        return html([
            template
                
        ])

    }

    static get observers(){
        return [
            '_checkShouldFetchData(_page, _slug)'
        ]
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {
            data:{
                type: Object,
                observer: '_dataChanged'
            }
        }
    }

    _checkShouldFetchData(_page, _slug){
        if(this.data == null && _page === 'product' && _slug != null){
            store.dispatch(getProductBySlug(_slug, 
                product => store.dispatch(setActiveProduct(product)))
            )
        }
    }

    _dataChanged(data){
        if(data){
            store.dispatch(productWasViewed(data))
        }
    }

    hide() {
        return new Promise(async (resolve, reject) => {
            const animation = await fadeOut(this).finished;
            this.active = false;
            resolve();
        })

    }

    show() {
        return new Promise(async (resolve, reject) => {
            const animation = await fadeIn(this).finished;
            this.active = true;
            resolve();
        })

    }

    _onPageSelected(selected){
        
        selected ? this.show() : this.hide()  
        this.active = selected;
    }

    _addToCart(e){
        if(!this.data) return;

        const data = {
            ...this.data,
            quantity: this.quantity,
            selectedColor: 'pink'
        }

        store.dispatch(addToCart(data, this.user != null ))
        this.onAddedToCart();
    }

    onAddedToCart(){
        window.scrollTo(0, 0);
        this.dialog.open();
    }

    _edit(){
        if (!this.data) return;
        store.dispatch(setEditingProduct(this.data))
    }

    _getFeatures(features){
        if(features)
            return features.split('\n');
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
    async ready() {
        super.ready();
        const buttonRipple = new MDCRipple(this.querySelector('.mdc-button'));
        this.dialog = document.getElementById('cart-modal');

        afterNextRender(this, () => {
        })
        
    }

    _stateChanged(state) {
        this.data = state.shop.activeProduct;
        this._page = state.app.route.page;
        this._slug = state.app.route.slug;
        this.user = state.app.user;
    }
}

customElements.define('remi-product', RemiProduct);