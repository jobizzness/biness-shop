import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { MDCRipple } from '@material/ripple';
import { MDCSelect } from '@material/select';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import buttonStyles from "./material/button.html";
import selectStyles from "./material/select.html";
import { hideAppOverflow} from '../actions/app.js';

customElements.define('remi-order-details', class extends mixinBehaviors(
    [IronOverlayBehavior], PolymerElement) {
    static get template() {
        return html`
            ${html([
                buttonStyles
                + selectStyles
            ])}
            <style>
            :host {
                display: block;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 0;
                overflow-x: hidden;
                background-color: white;
                width: 100%;
                margin-left: auto;
                max-width: 1172px;
                padding: 0;
                visibility: hidden;
                will-change: transform;
                -webkit-transform: translate3d(calc(100% + 16px), 0, 0);
                transform: translate3d(calc(100% + 16px), 0, 0);
                transition-property: visibility, -webkit-transform;
                transition-property: visibility, transform;
                transition-duration: 0.2s;
                transition-delay: 0.1s;
                padding-bottom: 17em;
            }
            :host(.opened) {
                z-index: 4;
                visibility: visible;
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            .toolbar{
                border-bottom: 1px solid #b4c3ca;
                border-top: 1px solid #b4c3ca;
                display: flex;
                align-items: center;
                background-color: white;
                -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,0.09);
                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.09);
                padding-left: 2em;
                padding-right: 2em;
                position: relative;
                z-index: 6;
                min-height: 66px;
                -webkit-flex-shrink: 0;
                flex-shrink: 0;
            }
            .customer-deails, 
            .order-items--header, 
            .order-item, .actions,
            .order-summary{
                display: flex;
            }
            .order-item{

            }
            .order-item:nth-child(odd){
                background: #faf9fc;
            }
            .customer-deails{
                border-bottom: 1px solid #eee;
                padding-bottom: 1em;
                margin-bottom: 2em;
            }
            main{
                padding: 2em;
            }
            .title{
                font-size: 1.5rem;
                color: var(--app-primary-color);
            }
            .flex, 
            .customer-deails>*, 
            .order-items--header>*,
            .order-item>*{
                flex: 1;
            }
            .order-item>*{
                padding: 16px;
            }
            .customer-deails>*>*{
                display: block;
                position: relative;
            }
            .customer-deails>div>.label{
                color: var(--app-secondary-color);
                font-weight: 600;
                padding: 16px;
            }
            .customer-deails>div>.value{
                padding: 0 16px;
                font-size: 14px;
                color: #171514d1;
                font-weight: 600;
            }
            .order-items{
                margin: 3em 0;
            }
            .order-items--header{
                padding: 16px;
                background: #f4f3f8;;
            }
            .order-items--header>*{
                font-weight: 500;
                font-size: 15px;
                color: #4e4e4e;
                padding: 0 16px;
            }
            .product-info>*{
                display: block;
            }
            .product-info{
                width: 11em;
                flex: auto;
            }
            .product-name{
                text-decoration: none;
                font-weight: 600;
                color: #0068bb;
            }
            .bold{
                font-weight: 600;
                color: #171514;
            }
            .mdc-select{
                min-width: 230px;
            }
            @media (max-width: 767px) {
                :host {
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: auto;
                    min-height: 100vh;
                    -webkit-transform: translate3d(0, 100%, 0);
                    transform: translate3d(0, 100%, 0); 
                    overflow: auto;
                }
            }
            </style>
            <div>
                <header class="toolbar">
                    <h1 class="title">Order Details</h1>
                    <span class="flex"></span>
                    <button class="mdc-button" on-click="close">
                        <iron-icon icon="bn-icons:close"></iron-icon>
                    </button>
                </header>
                <main>
                    <!-- Order details -->
                    <div class="customer-deails">
                        <div>
                            <span class="label">
                                <iron-icon src="/assets/icons/avatar.svg"></iron-icon> 
                                Customer
                            </span>
                            <span class="value">Abdoulie Jallow</span>
                        </div>
                        <div>
                            <span class="label">
                                <iron-icon src="/assets/icons/clock.svg"></iron-icon> 
                                Date
                            </span>
                            <span class="value">11/03/2017</span>
                        </div>
                        <div>
                            <span class="label">
                                <iron-icon src="/assets/icons/credit-card.svg"></iron-icon> 
                                Payment
                            </span>
                            <span class="value">Paid</span>
                        </div>
                        <div>
                            <span class="label">
                                <iron-icon src="/assets/icons/delivery.svg"></iron-icon> 
                                Order
                            </span>
                            <span class="value">#092950432</span>
                        </div>
                    </div>
                    <!-- Actions -->
                    <div class="actions">
                        <span class="flex"></span>
                        <div class="mdc-select mdc-select--box">
                            <select class="mdc-select__native-control">
                                <option value="grains" selected>
                                    Processing
                                </option>
                                <option value="vegetables">
                                    Shipped
                                </option>
                                <option value="fruit" disabled>
                                    Delivered
                                </option>
                            </select>
                            <label class="mdc-floating-label">Order Status</label>
                            <div class="mdc-line-ripple"></div>
                        </div>
                    </div>
                    <!-- Items -->
                    <div class="order-items">
                        <div class="order-items--header">
                            <span class="product-info">Product</span>
                            <span>Cost</span>
                            <span>Quantity</span>
                            <span>Sub Total</span>
                        </div>
                        <div class="order-item">
                            <div class="product-info">
                                <a href="#" class="product-name">Tima Mink Lashes</a>
                                <span>SKU: F3</span>
                            </div>
                            <span class="price">$20.00</span>
                            <span>3</span>
                            <span class="sub-total bold">$173.00</span>
                        </div>
                        <div class="order-item">
                            <div class="product-info">
                                <a href="#" class="product-name">Reminisce Highlighter Kit</a>
                                <span>SKU: F3</span>
                            </div>
                            <span class="price">$20.00</span>
                            <span>2</span>
                            <span class="sub-total bold">$270.00</span>
                        </div>
                        <div class="order-item">
                            <div class="product-info">
                                <a href="#" class="product-name">Chocolate Thunder Matte Liquid Lipstick</a>
                                <span>SKU: F3</span>
                            </div>
                            <span class="price">$20.00</span>
                            <span>1</span>
                            <span class="sub-total bold">$20.00</span>
                        </div>
                        <div class="order-item">
                            <div class="product-info">
                                <a href="#" class="product-name">Chocolate Thunder Matte Liquid Lipstick</a>
                                <span>SKU: F3</span>
                            </div>
                            <span class="price">$20.00</span>
                            <span>1</span>
                            <span class="sub-total bold">$20.00</span>
                        </div>
                    </div>
                    <!-- Summary -->
                    <div class="order-summary">
                        <span class="flex"></span>
                        <div style="width: 20em">
                            <div>
                                <span>Grand Total:</span>
                                <span class="bold">$390.90</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
`;
    }

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
        new MDCSelect(this.shadowRoot.querySelector('.mdc-select'))
    }

    _renderOpened() {
        hideAppOverflow(true);
        this.restoreFocusOnClose = true;
        //this.backdropElement.style.display = 'none';
        this.classList.add('opened');
        

    }

    _renderClosed() {
        this.classList.remove('opened');
        hideAppOverflow();
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

    // get _focusableNodes() {
    //     return [this.$.viewCartAnchor, this.$.closeBtn];
    // }

    refit() { }

    notifyResize() { }
});