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
import button from './material/button.html'
import progress from './material/linear-progress.html'
class BnProgressButton extends LitElement {

    _render(props) {
        
        return html`
        ${html([button + progress])}
        <style>
            button{
                width: 100%;
                --mdc-theme-primary: var(--biness-progress-button-primary, white)
            }
            button.mdc-button:disabled {
                color: rgba(255, 255, 255, 0.37);
            }
            #progress{
                width: 100%;
            }
            [hidden=true]{
                display:none
            }
        </style>
        <button class="mdc-button" on-click="submit" id="button" disabled$="${props.loading}">
            Publish
        </button>
        <div role="progressbar" id="progress" hidden="${!props.loading}" class="mdc-linear-progress mdc-linear-progress--indeterminate">
            <div class="mdc-linear-progress__buffering-dots"></div>
            <div class="mdc-linear-progress__buffer"></div>
            <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
            </div>
            <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
            </div>
        </div>
    `;
    }

    static get properties() {
        return {
            loading: Boolean,
        }
    }

    constructor() {
        super();

    }

    ready() {
        super.ready()
    }

    _didRender(properties, changeList) {

    }
}

window.customElements.define('biness-progress-button', BnProgressButton);