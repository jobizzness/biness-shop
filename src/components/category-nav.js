/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement, html } from '@polymer/lit-element';

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class CategoryNav extends LitElement {
    static get properties() {
        return {

        }
    }

    _render(props) {
        return html`
        <style>
            :host { 
                display: block;
            }
            .md-tabs {
                font-size: 14px;
                list-style: none;
                padding-left: 0;
                margin-bottom: 0;
                background: var(--app-primary-color);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
            }
            .horizontal{
                overflow-y: hidden;
                overflow-x: auto;
                    margin-bottom:0;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch;
            }
            .horizontal::-webkit-scrollbar {
            display: none;
            }
            .md-tabs li a {
                color: #fff;
                display: block;
                padding: 1em 2em;
                outline: none;
                border-bottom: 3px solid transparent;
                text-decoration: none;
                opacity: 0.8;
            }
            .md-tabs li.active a {
                border-bottom: 3px solid var(--app-secondary-color);
                opacity: 1;
                animation: md-tab-ripple 0.2s linear forwards;
            }
            .md-tabs li{
                display: inline-block;
            }

            @keyframes md-tab-ripple {
                0% {
                    background: transparent;
                }
                50% {
                    background: rgba(255, 255, 255, 0.05);
                }
                100% {
                    background: transparent;
                }
            }

        </style>
        <section>
            <ul class="md-tabs horizontal">
                <li><a href="/shop/lipstick">Lipstick</a></li>
                <li class="active"><a href="/shop/lipstick">Lip Gloss</a></li>
                <li><a href="/shop/lipstick">Highlighter</a></li>
                <li><a href="/shop/lipstick">Brushes</a></li>
            </ul>
        </section>

        `;
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {

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

    connectedCallback() {
        super.connectedCallback();
        this.value = 1;
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
    }
}

customElements.define('category-nav', CategoryNav);