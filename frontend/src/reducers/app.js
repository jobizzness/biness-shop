/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { UPDATE_ROUTE, UPDATE_OFFLINE,
  OPEN_SNACKBAR, CLOSE_SNACKBAR, UPDATE_LOADING,
        UPDATE_USER } from '../actions/app.js';

const app = (state = {drawerOpened: false, user: null, route: {}}, action) => {
  switch (action.type) {
    case UPDATE_ROUTE:
      return {
        ...state,
        route: action.route
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}

export default app;
