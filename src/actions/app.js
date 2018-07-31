/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { Auth } from '../core/auth.js';
import { User } from '../core/user.js';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_LOADING = 'UPDATE_LOADING';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
let ROUTE = {};

export const navigate = (path) => (dispatch) => {
  dispatch(updateLoading(true));
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.split('/')[1];
  const slug = page ? path.split('/')[2] : null;

  ROUTE = {
    page: page,
    slug: slug
  }
  
  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

};

const loadPage = (page) => async (dispatch) => {
  // If the page is invalid, set to 404. The is also a good spot to check
  // other location things like sub-path or query params.
  if (['home', 'product', 'shop', 'about', 'contact', 'cart', 'login',
      'dashboard', 'product-edit', 'orders', 'purchases'].indexOf(page) === -1) {
    page = 'view404';
  }

  switch(page) {
    case 'home':
      await import('../pages/remi-home');
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    case 'product':
      await import('../pages/remi-product');
      break;
    case 'cart':
      await import('../pages/remi-cart');
      break;
    case 'shop':
      await import('../pages/remi-shop');
      break;
    case 'about':
      await import('../pages/remi-about');
      break;
    case 'login':
      await import('../pages/remi-login');
      break;
    case 'dashboard':
      await import('../pages/remi-dashboard');
      break;
    case 'product-edit':
      await import('../pages/remi-product-editor');
      break;
    case 'orders':
      await import('../pages/remi-orders');
      break;
    default:
      await import('../pages/remi-home');
  }

  ROUTE.page = page;
  dispatch(updateRoute(ROUTE));
  dispatch(updateLoading(false));
}

const updateRoute = (route) => {
  return {
    type: UPDATE_ROUTE,
    route
  };
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
}

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    loading
  }
}



export const login = (data) => async (dispatch, state) => {
  await Auth.login(data);
}

export const listenUserChange = () => (dispatch, state) => {
  Auth._onAuthChange((user) => {
    User.onChanged(user, actualUser => dispatch(updateUser(actualUser)));
  })
  
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const hideAppOverflow = (value) => {
  if(value){
    document.body.style.overflow = 'hidden';
  }else{
    document.body.style.overflow = 'auto';
  }
}