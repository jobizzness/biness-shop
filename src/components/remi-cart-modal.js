import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { IronOverlayBehaviorImpl } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import buttonStyles from "./material/button.html";
import { MDCRipple } from '@material/ripple';

customElements.define('remi-cart-modal', class extends mixinBehaviors(
    [IronOverlayBehaviorImpl], PolymerElement) {
    static get template() {
        return html`
            ${html([buttonStyles])}
            <style>
            :host {
                display: block;
                position: fixed;
                background-color: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                width: 100%;
                max-width: 700px;
                padding: 12px;
                visibility: hidden;
                will-change: transform;
                top: 56px;
                right: 16px;
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
            .close{

            }
            @media (max-width: 767px) {
                :host {
                    top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: auto;
                    -webkit-transform: translate3d(0, 100%, 0);
                    transform: translate3d(0, 100%, 0);
                }
            }
            </style>
            <div>
                <div>
                    <h1 class="label">Success! You've added this item to your cart.</h1>
                </div>
                <div class="actions">
                    <a href="/cart">
                        <button class="mdc-button checkout">
                            Checkout
                        </button>
                    </a>
                    <span>
                        <button class="mdc-button close">
                            Continue
                        </button>
                    </span>
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

    refit() { }

    notifyResize() { }
});