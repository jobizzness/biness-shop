import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import { MDCRipple } from '@material/ripple';
import { MDCFormField } from '@material/form-field';
import { MDCCheckbox } from '@material/checkbox';

import buttonStyles from "./material/button.html";
import checkboxStyles from "./material/checkbox.html";
import formField from "./material/form-field.html";

import "./biness-accordion.js";

customElements.define('biness-shop-filter', class extends mixinBehaviors(
    [IronOverlayBehaviorImpl], PolymerElement) {
    static get template() {
        return html`
            ${html([
                buttonStyles + 
                checkboxStyles +
                formField
            ])}
            <style>
            :host {
                display: block;
                position: fixed;
                background-color: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                width: 100%;
                max-width: 360px;
                padding: 12px;
                visibility: hidden;
                will-change: transform;
                top: 0;
                right: 0;
                height: 100vh;
                -webkit-transform: translate3d(calc(100% + 16px), 0, 0);
                transform: translate3d(calc(100% + 16px), 0, 0);
                transition-property: visibility, -webkit-transform;
                transition-property: visibility, transform;
                transition-duration: 0.2s;
                transition-delay: 0.1s;
            }
            :host(.opened) {
                visibility: visible;
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            .label{
                font-size: 1rem;
                color: var(--app-primary-color);
                font-weight: 500;
            }
            .actions{
                display: flex;
            }
            a{
                text-decoration: none;
            }
            .actions>*{
                margin: 1em;
            }
            .checkout{
                --mdc-theme-primary: #ffffff;
                background-color: #ff0057 !important;
            }
            .vertical{
                display: flex;
                flex-direction: column;
            }
            .close{

            }
            header{
                height: 64px;
            }
            @media (max-width: 767px) {
                :host {
                    top: auto;
                    bottom: 0;
                    right: 0;
                    width: 100%;
                    -webkit-transform: translate3d(calc(100% + 16px), 0, 0);
                    transform: translate3d(calc(100% + 16px), 0, 0);
                }
            }
            </style>
            <div class="wrapper">
                <header class="pad">
                    <span>Filter</span>
                </header>
                <div class="">
                    <div class="accordions">
                        <template is="dom-repeat" items="[[data]]" as="filter_item">
                            <biness-accordion>
                                <div slot="header">
                                    <span title>[[filter_item.label]]</span>
                                    <span icon>
                                        <iron-icon icon="bn-icons:drop-down"></iron-icon>
                                    </span>
                                </div>
                                <div slot="content">
                                    <div class="vertical">
                                        <template is="dom-repeat" items="[[filter_item.items]]">
                                            <div class="mdc-form-field">
                                                <div class="mdc-checkbox">
                                                    <input type="checkbox"
                                                        class="mdc-checkbox__native-control"
                                                        id$="[[filter_item.label]]-[[index]]"/>
                                                    <div class="mdc-checkbox__background">
                                                    <svg class="mdc-checkbox__checkmark"
                                                        viewBox="0 0 24 24">
                                                        <path class="mdc-checkbox__checkmark-path"
                                                            fill="none"
                                                            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                                                    </svg>
                                                    <div class="mdc-checkbox__mixedmark"></div>
                                                    </div>
                                                </div>
                                                <label for="[[filter_item.label]]-[[index]]">[[item.label]]</label>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </biness-accordion>
                        </template>
                    </div>
                </div>
            </div>
`;
    }

    static get is() { return 'shop-cart-modal'; }

    static get properties() {
        return {
            withBackdrop: {
                type: Boolean,
                value: true
            }
        }
    }

    ready() {
        super.ready();
        this.setAttribute('role', 'dialog');
        this.setAttribute('aria-modal', 'true');
        this.addEventListener('transitionend', (e) => this._transitionEnd(e));
        this.addEventListener('iron-overlay-canceled', (e) => this._onCancel(e));
        this.shadowRoot.querySelectorAll('.mdc-button').forEach(elem => new MDCRipple(elem));
        this.shadowRoot.querySelectorAll('.mdc-checkbox').forEach(elem => new MDCCheckbox(elem));
        this.shadowRoot.querySelectorAll('.mdc-form-field').forEach(elem => new MDCFormField(elem));
        
    }

    _renderOpened() {
        this.restoreFocusOnClose = true;
        this.backdropElement.style.display = 'none';
        this.classList.add('opened');
    }

    _renderClosed() {
        this.classList.remove('opened');
    }

    _onCancel(e) {
        // Don't restore focus when the overlay is closed after a mouse event
        if (e.detail instanceof MouseEvent) {
            this.restoreFocusOnClose = false;
        }
    }

    _transitionEnd(e) {
        if (e.target !== this || e.propertyName !== 'transform') {
            return;
        }
        if (this.opened) {
            this._finishRenderOpened();
            this.fire('announce', 'Item added to the cart');
        } else {
            this._finishRenderClosed();
            this.backdropElement.style.display = '';
        }
    }

    get _focusableNodes() {
        return [this.$.viewCartAnchor, this.$.closeBtn];
    }

    ready(){
        super.ready()
        this.data = [
            {
                label: 'Price',
                items: [
                    {label: 'All prices', value: '*'},
                    { label: '$0 to $50', value: '0-50' },
                    { label: '$50 to $100', value: '50-100' },
                    { label: '$100 to $200', value: '100-200' },
                ]
            },
            {
                label: 'Size',
                items: [
                    { label: 'All prices', value: '*' },
                    { label: '$0 to $50', value: '0-50' },
                    { label: '$50 to $100', value: '50-100' },
                    { label: '$100 to $200', value: '100-200' },
                ]
            },
            {
                label: 'Brand',
                items: [
                    { label: 'All prices', value: '*' },
                    { label: '$0 to $50', value: '0-50' },
                    { label: '$50 to $100', value: '50-100' },
                    { label: '$100 to $200', value: '100-200' },
                ]
            },
            {
                label: 'Color',
                items: [
                    { label: 'All prices', value: '*' },
                    { label: '$0 to $50', value: '0-50' },
                    { label: '$50 to $100', value: '50-100' },
                    { label: '$100 to $200', value: '100-200' },
                ]
            }
        ]
    }
    refit() { }

    notifyResize() { }
});