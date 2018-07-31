/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  SET_ACTIVE_PRODUCT,
  GET_PRODUCTS,
  SET_EDITING_PRODUCT,
  REMOVE_FROM_CART,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
} from '../actions/shop.js';

import { ADD_TO_CART, SET_CART } from "../actions/cart.js";

import { cart, INITIAL_CART} from './cart.js';

const INITIAL_PRODUCT = {
  views: 0
}

const INITIAL_STATE = {
  products: [], 
  activeProduct: null,
  editingProduct: INITIAL_PRODUCT, 
  cart: INITIAL_CART
}

export const shop = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case SET_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.activeProduct
      }
    case SET_EDITING_PRODUCT:
      return {
        ...state,
        editingProduct: action.editingProduct
      }
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case SET_CART:
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        // products: products(state.products, action),
        cart: cart(state.cart, action),
        error: ''
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        error: 'Checkout failed. Please try again'
      };
    default:
      return state;
  }
};


// Slice reducer: it only reduces the bit of the state it's concerned about.
// const products = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//     case REMOVE_FROM_CART:
//       const productId = action.productId;
//       return {
//         ...state,
//         [productId]: product(state[productId], action)
//       };
//     default:
//       return state;
//   }
// };

// const product = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {
//         ...state,
//         inventory: state.inventory - 1
//       };
//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         inventory: state.inventory + 1
//       };
//     default:
//       return state;
//   }
// };