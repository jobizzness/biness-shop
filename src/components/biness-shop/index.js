

import { html } from '@polymer/polymer/polymer-element';
import { BinessShop } from '../../core/app.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../../store.js';
import { navigate } from '../../actions/app.js';
import { fetchUser } from '../../actions/auth.js'
import './style.css';
import template from './template.html';
import { lightComponent } from '../lightComponent.js';
import { InjectGlobalStyle } from '../../core/utils.js'

import swal from 'sweetalert';
BinessShop.alert = swal;

window.customElements.define('biness-shop', class extends connect(store)(lightComponent) {

  static get template() {

    return html([
      template
    ])
  }

static get properties() {
  return {
    appTitle: String,
    page: {
      type: Object,
      observer: '_pageChanged',
      reflectToAttribute: true 
    },
    loading: String,
    _drawerOpened: Boolean,
    _snackbarOpened: Boolean,
    _offline: Boolean,
    hideNav:{
      type: Boolean,
      reflectToAttribute: true,
      computed: '_computeHideNav(page)'
    },
    alerts: {
      type: Array
    }
  }
}
  
  static get observers(){
    return [
      '_cartChanged(cart)',
      '_alertsChanged(alerts.*)'
    ]
  }

  get alertTitles(){
    return {
      success: 'Awesome!',
      info: 'Heads up!',
      warn: 'Warning',
      error: 'Oh snap'
    }
  }
  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  async ready() {
    super.ready();

    this.$pages = this.querySelector('#pages');
    store.dispatch(fetchUser())

    await import('../lazy-components.js');
    InjectGlobalStyle({ name: 'linear-progress' }, () => import('../../components/material/linear-progress.html'));

  }

  alert(data){
      const notify = document.createElement('vaadin-notification')
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          .error{
            color: #e72545;
          }
          .success{
            color: #38bca0;
          }
          .warn{
            color: #f5b225;
          }
          .info{
            color: #40a4f1;
          }
        </style>
        <div class="${data.type} notification">
          <b><span>${this.alertTitles[data.type]} !</span></b> ${data.message}
        </div>
      `;

      notify.data = data
      notify.position = 'top-end'
      notify.appendChild(template)

      document.body.appendChild(notify);
      notify.opened = true;
      notify.addEventListener('opened-changed', function () {
        document.body.removeChild(notify);
      });
    
  }


  _cartChanged(cart){
    //console.log(cart);
  }

  connectedCallback() {
    super.connectedCallback();
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    // installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    // installMediaQueryWatcher(`(min-width: 460px)`,
    //   (matches) => store.dispatch(updateLayout(matches)));

    this.addEventListener('toggle-filter', (e) => this.$.shopFilter.open());
    this.addEventListener('alert', (e) => this.alert(e.detail))
    this.addEventListener('added-to-cart', (e) => this.$.cartModal.open())
  }


  _computeHideNav(){
    return ['product', 'cart'].indexOf(this.page) != -1;
  }
  
  /**
    * @desc When the user navigates to a new page
    * @param {old, new} page - passes old and new page
    */
  _pageChanged(page, old) {
    this._drawerOpened = false;

    this._activatePage(
      this.$pages.querySelector(`[page=${page}]`),
      this.$pages.querySelector(`[page=${old}]`)
    );
    
  }

  is_selected(page, view){
    return page === view;
  }
  
  async _activatePage(_newPage, _oldPage) {
    //hide the old page
    if (_oldPage && typeof _oldPage.hide === "function") {
      await _oldPage.hide();
    }

    //Show the new page
    if (_newPage && typeof _newPage.show === "function") {
      await _newPage.show();
    } else {
      //if we are here, the page is not loaded so maybe show a spinner
      //wait for awhile try again?
      //sky is the limit
      _newPage.start = true;
    }

    window.scrollTo(0, 0);


  }

  _openDrawer(){
    this._drawerOpened = true;
  }
  // _didRender(properties, changeList) {
  //   if ('_page' in changeList) {
  //     const pageTitle = properties.appTitle + ' - ' + changeList._page;
  //     updateMetadata({
  //       title: pageTitle,
  //       description: pageTitle
  //       // This object also takes an image property, that points to an img src.
  //     });
  //   }
  // }

  _stateChanged(state) {
    this.page = state.app.route.page
    this._offline = state.app.offline
    this._snackbarOpened = state.app.snackbarOpened
    this._user = state.app.user
    this.loading = state.app.loading
    this.cartItemsCount = state.shop && state.shop.cart.numitems
  }

  _userIsAdmin(user) {
      return user && user.roles && user.roles.admin
  }

});