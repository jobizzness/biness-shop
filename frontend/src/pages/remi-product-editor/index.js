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
import { MDCTextField } from '@material/textfield';
import {Checkbox} from "@material/mwc-checkbox";
import { Switch } from "@material/mwc-switch";

import { store } from '../../store.js';
import template from './template.html';
import '../../components/remi-media-uploader.js';

import { shop } from "../../reducers/shop.js";
import { publishProduct, setEditingProduct, getProductBySlug } from "../../actions/shop.js";
import { slugify, InjectGlobalStyle} from '../../core/utils.js';

store.addReducers({
    shop
});

InjectGlobalStyle({ name: 'remi-product-editor' }, () => import('./style.html'));
InjectGlobalStyle({name: 'material-textfield'}, () => import('../../components/material/textfield.html'));
InjectGlobalStyle({name: 'material-button'}, () => import('../../components/material/button.html'));


/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiProductEdit extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            data: {
                type: Object,
                value: {}
            }
        }
    }

    static get template() {
        return html([
            template
        ]);
    }

    static get observers() {
        return [
            '_slugify(title)',
            '_checkShouldFetchData(_page, _slug)'
        ]
    }

    _checkShouldFetchData(_page, _slug) {
        if (this.data.name == null && _page === 'product-edit' && (_slug != null && _slug != 'create')) {
            store.dispatch(getProductBySlug(_slug, product => store.dispatch(setEditingProduct(product))))
        }
    }

    _slugify(title){
        if(title){
            this.slug = slugify(title);
        }
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

    submit(e) {
        e.preventDefault();

        this._formIsValid()
            ? this._submit(this.data)
            : console.error('form is invalid')
    }

    _formIsValid() {
        return this.querySelector('form').checkValidity();
    }

    _submit(data) {
        console.log('submiting this form now');
        store.dispatch(publishProduct(data))
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        this.querySelectorAll('.mdc-text-field').forEach((node) => new MDCTextField(node));
    }

    _stateChanged(state){
        this.data = state.shop.editingProduct;
        this._page = state.app.route.page;
        this._slug = state.app.route.slug;
    }
}

customElements.define('remi-product-editor', RemiProductEdit);