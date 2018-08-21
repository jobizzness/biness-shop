/**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { BinessShop } from './app.js';


const injected = BinessShop.injected = BinessShop.injected || [];


//injects global style
export const InjectGlobalStyle = async (component, callback) => {
    if (!alreadyInjected(component.name)) {

        BinessShop.injected.push(component)

        let style = await callback()
        const documentContainer = document.createElement('div');
        documentContainer.innerHTML = style.default;
        documentContainer.setAttribute('style', 'display: none;');
        document.head.appendChild(documentContainer);


    }
}

const alreadyInjected = (name) => {
    return injected.filter((item) => item.name === name).length > 0;
}

export const Slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}