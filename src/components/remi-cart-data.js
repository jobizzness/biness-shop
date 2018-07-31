import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';
import { setCart } from '../actions/cart.js';
import { shop} from '../reducers/shop.js';

store.addReducers({
    shop
})

customElements.define('remi-cart-data', class RemiCartData extends connect(store)(PolymerElement) {
    static get template() {
        return html`
            <app-localstorage-document key="remi-cart-data" id="storage"></app-localstorage-document>
        `;
    }

    static get is() { return 'shop-cart-data'; }

    static get properties() {
        return {

            cart: {
                type: Array,
                value: {},
                observer: '_cartChanged'
            }

        }
    }

    static get observers(){
        return [
            '_updateCart(user)'
        ]
    }

    _updateCart(user){
        let cart = user && user.cart || this.$.storage.data;
        if(cart != this._cart){
            store.dispatch(setCart(cart));
        }
        
    }

    _cartChanged(cart){
        this.$.storage.set('data', cart);
    }

    _stateChanged(state){
        this.cart = state.shop.cart;
        this.user = state.app.user;
    }

    ready(){
        super.ready();
    }
});