/**
    @license
    Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from '@polymer/polymer/polymer-element.js'
import { MDCRipple } from '@material/ripple'
import '@polymer/iron-image'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { PageViewElement } from '../../components/page-view-element.js'
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js"


import template from './template.html'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './style.css'
import 'iron-swiper-3/iron-swiper.js';
import '../../components/remi-color-swatch-input.js';
import '../../components/quantity-input.js';

import { store } from '../../store.js'
import { shop } from "../../reducers/shop.js";
import { getProduct, setActiveProduct, productWasViewed, setEditingProduct } from "../../actions/shop.js";
import { addToCart} from '../../actions/cart.js';

import { fadeIn, fadeOut } from '../../components/animation.js';
import {InjectGlobalStyle } from '../../core/utils.js';

store.addReducers({
    shop
});

let swiper = null;

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
                type: Object
            }
        }
    }

    _getImage(data){
        if(!data) return;
        
        if (data.images && data.images.length > 0){
            return data.images[0].url
        }
        
        if(data.image){
            return data.image
        }

    }

    _checkShouldFetchData(_page, _slug){
        if(this.data == null && _page === 'product' && _slug != null){
            store.dispatch(getProduct(_slug, 
                product => store.dispatch(setActiveProduct(product)))
            )
        }
    }

    _formatPrice(price) {
        price = parseFloat(price)
        return price ? '$' + price.toFixed(2) : '';
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
            quantity: 1 //this->quantity
            //selectedVariant: (this.selectedVariant ? this.selectedVariant : null)
        }

        store.dispatch(addToCart(data, this.user != null , (success, error) => {
            if (error) {
                let detail = {
                    type: 'error',
                    message: 'there was an error, please try again'
                }
                return this.dispatchEvent(new CustomEvent('alert', { bubbles: true, detail: detail }))
            }

            if (success) {
                this.dispatchEvent(new CustomEvent('added-to-cart', { bubbles: true }))
            }
        }))
    }

    onAddedToCart(){
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
    }

    _thumbnail(image){
        return image.url
    }

    initSlider(){
        afterNextRender(this, () =>{
            swiper = new Swiper('.swiper-container', {
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

            })
        })
    }

    _swipeTo(e){
        let index = e.target.index
        swiper.slideTo(index +1, 250);
    }

    _stateChanged(state) {
        this.data = state.shop.activeProduct;
        this._page = state.app.route.page;
        this._slug = state.app.route.slug;
        this.user = state.app.user;
    }
}

customElements.define('remi-product', RemiProduct);