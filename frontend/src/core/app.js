import { Request } from './request.js';
import { CONFIG } from '../config.js';

window.__BINESS_SHOP__ = window.__BINESS_SHOP__ || new class {

    constructor() {
        this.element = document.querySelector(CONFIG.root);
        this.API_URL = CONFIG.API_URL
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    get Request() {
        return Request;
    }

    createRequest() {

    }

}();
//Export remi app or something
//this is one useless comment
export const BinessShop = window.__BINESS_SHOP__;