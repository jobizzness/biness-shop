import {
    SET_EDITING_PRODUCT,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAILURE
} from '../actions/shop.js';

import { ADD_TO_CART, SET_CART, REMOVE_FROM_CART} from "../actions/cart.js";

export const INITIAL_CART = {
    items: [],
    total: 0,
    numItems: 0,
};

export const cart = (state = INITIAL_CART, action) => {
    switch (action.type) {
        case ADD_TO_CART:
        case REMOVE_FROM_CART:
            return {
                items: getItems(state.items, action),
                total: getTotal(state.total, action),
                numItems: getNumItems(state.numItems, action)
            };
        case SET_CART:
            return action.cart;
        case CHECKOUT_SUCCESS:
            return INITIAL_CART;
        default:
            return state;
    }
};

const getItems = (state = INITIAL_CART.items, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let i = _indexOf(action.product, state);
            if (i != -1) {
                return updateQuantity(i, action.product.quantity, state)
            }
            return [
                ...state,
                action.product
            ]
        case REMOVE_FROM_CART:
            return state.filter(e => e.key !== action.product.key);

        default:
            return state;
    }
};

const getTotal = (state = INITIAL_CART.total, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return state + (action.product.price * action.product.quantity)
        case REMOVE_FROM_CART:
            return state - (action.product.price * action.product.quantity)

        default:
            return state;
    }
}

const getNumItems = (state = INITIAL_CART.numItems, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return state + (1 * action.product.quantity)
        case REMOVE_FROM_CART:
            return state - (1 * action.product.quantity)

        default:
            return state;
    }
}

const updateQuantity = (index, quantity, state) => {
    let newState = [
        ...state
    ]
    newState[index].quantity += quantity;
    return newState;
}

const _indexOf = (product, cart) => {
    if (cart) {
        for (let i = 0; i < cart.length; ++i) {
            let entry = cart[i];
            if (entry.key === product.key && entry.selectedColor === product.selectedColor) {
                return i;
            }
        }
    }
    return -1;
}
