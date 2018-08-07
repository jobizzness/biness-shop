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

class BinessAccordion extends LitElement {
    _render(props) {
        return html`
        <style>
            .content{
                max-height: 0;
                transition: max-height 500ms;
                overflow:hidden;
            }
            header{
                padding: 16px 1em;
                cursor: pointer;
                position: relative;
                display:flex;
                border-bottom: 1px solid #eee;
            }
            header:hover{
                border-color: black;
            }
            :host([opened]) .content{
                height: auto;
                max-height: 500px;
            }
            ::slotted([icon]){

            }
        </style>
        <div>

            <header on-click="${(e) => this.toggle(e)}">
                <slot name="header"></slot>            
            </header>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    `;
    }

    static get properties() {
        return {
            opened: Boolean
        }
    }

    set opened(value) {
        const isChecked = Boolean(value);
        if (isChecked)
            this.setAttribute('opened', '');
        else
            this.removeAttribute('opened');
    }

    get opened() {
        return this.hasAttribute('opened');
    }

    toggle(e){
        console.log(e)
        this.opened = !this.opened;
    }

    constructor() {
        super();
        this.opened = false;

    }

    _firstRendered() {

    }

    _didRender(properties, changeList) {

    }
}

window.customElements.define('biness-accordion', BinessAccordion);