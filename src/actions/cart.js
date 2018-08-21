/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import * as Shop from "../core/shop.js";

export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product, useRemote, callback) => async (dispatch, getState) => {

    //check inventory before we add it?
    if (product.stock < product.quantity) {
        throw new Error('Not enough inventory for this product', this);
    }

    dispatch(_addToCart(product))
    if (callback) callback(true)

    if (useRemote) {
        let cart = (getState()).shop.cart
        try {
            await Shop.updateCart(cart)
        } catch (error) {
            if (callback) callback(false, error)
            return;
        }
    }

};


const _addToCart = (product) => {
    
    return {
        type: ADD_TO_CART,
        product
    }
}

export const removeFromCart = (product, useRemote, callback) => async (dispatch, getState) => {

    dispatch(_removeFromCart(product))
    if (callback) callback(true)

    if (useRemote) {
        let cart = (getState()).shop.cart
        try {
            await Shop.updateCart(cart)
        } catch (error) {
            if (callback) callback(false, error)
            return;
        }
    }
};

const _removeFromCart = (product) => {
    return {
        type: REMOVE_FROM_CART,
        product
    }
}

export const setCart = (cart) => (dispatch) => {
    dispatch({
        type: SET_CART,
        cart
    })
};
