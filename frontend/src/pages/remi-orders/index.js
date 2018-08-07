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
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';

import '../../components/remi-order-details.js';
import { store } from '../../store.js';
import template from './template.html';
import { InjectGlobalStyle } from '../../core/utils.js';

InjectGlobalStyle({ name: 'remi-orders' }, () => import('./style.html'));
/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiOrders extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            orders:{
                type: Array
            },
            /**
             * The selected expense object.
             * @type {Array}
             */
            activeItem: {
                observer: '_activeItemChanged'
            }
        }
    }

    static get template() {
        return html([
            template
        ]);
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
        this.orders = [
            {
                number: '1077', date: '	Sep 8, 7:11pm', total: 206.00,
                payment: {
                    status: 'paid'
                },
                fulfilment: {
                    status: 'Fulfilled'
                },
                customer: {
                    firstName: 'Musa',
                    lastName: 'Jallow'
                }
            },
            {
                number: '1077', date: '	Sep 8, 7:11pm', total: 206.00,
                payment: {
                    status: 'paid'
                },
                fulfilment: {
                    status: 'Fulfilled'
                },
                customer: {
                    firstName: 'Musa',
                    lastName: 'Jallow'
                }
            }
        ]
    }

    _stateChanged(state){
        
    }
}

customElements.define('remi-orders', RemiOrders);