/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, LitElement } from '@polymer/lit-element';
import button from './material/button.html'
import progress from './material/linear-progress.html'
class BnProgressButton extends LitElement {

    _render(props) {

        return html`
        ${html([button + progress])}
        <style>
            button{
                width: 100%;
                --mdc-theme-primary: var(--biness-spinning-button-primary, var(--app-primary-color))
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
            .spinner {
                -webkit-animation: rotator 1.4s linear infinite;
                        animation: rotator 1.4s linear infinite;
                }

                @-webkit-keyframes rotator {
                0% {
                    -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(270deg);
                            transform: rotate(270deg);
                }
                }

                @keyframes rotator {
                0% {
                    -webkit-transform: rotate(0deg);
                            transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(270deg);
                            transform: rotate(270deg);
                }
                }
                .path {
                stroke-dasharray: 187;
                stroke-dashoffset: 0;
                -webkit-transform-origin: center;
                        transform-origin: center;
                -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
                        animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
                }

                @-webkit-keyframes colors {
                0% {
                    stroke: #4285F4;
                }
                25% {
                    stroke: #DE3E35;
                }
                50% {
                    stroke: #F7C223;
                }
                75% {
                    stroke: #1B9A59;
                }
                100% {
                    stroke: #4285F4;
                }
                }

                @keyframes colors {
                0% {
                    stroke: #4285F4;
                }
                25% {
                    stroke: #DE3E35;
                }
                50% {
                    stroke: #F7C223;
                }
                75% {
                    stroke: #1B9A59;
                }
                100% {
                    stroke: #4285F4;
                }
                }
                @-webkit-keyframes dash {
                0% {
                    stroke-dashoffset: 187;
                }
                50% {
                    stroke-dashoffset: 46.75;
                    -webkit-transform: rotate(135deg);
                            transform: rotate(135deg);
                }
                100% {
                    stroke-dashoffset: 187;
                    -webkit-transform: rotate(450deg);
                            transform: rotate(450deg);
                }
                }
                @keyframes dash {
                0% {
                    stroke-dashoffset: 187;
                }
                50% {
                    stroke-dashoffset: 46.75;
                    -webkit-transform: rotate(135deg);
                            transform: rotate(135deg);
                }
                100% {
                    stroke-dashoffset: 187;
                    -webkit-transform: rotate(450deg);
                            transform: rotate(450deg);
                }
                }

        </style>
        <button class="mdc-button" id="button" disabled="${props.loading}">
            <slot hidden="${props.loading}"></slot>
            <div class="spinner" hidden="${!props.loading}">
                <svg class="spinner" width="35px" height="30px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        </button>
        
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

window.customElements.define('biness-spinning-button', BnProgressButton);