/**
  @license
  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { RemiApp } from './app.js';


const injected = RemiApp.injected = RemiApp.injected || [];

export const convertObjectToArray = (obj) => {
    let data = []
    for (let item in obj) {
        obj[item].key = item;
        data.push(obj[item])
    }
    return data;
}

export const Inject = (component) => {
    injected.some((item) => {
        if (item.name === component) {
            return item.component
        }
    });
    return makeInjection(component)
}

const makeInjection = (componentName) => {
    let service = document.createElement(componentName)
    document.body.appendChild(service)
    TravApp.injected.push({
        name: componentName,
        component: service
    });
    return service;
}



//injects global style
export const InjectGlobalStyle = async (component, callback) =>{
    if (!alreadyInjected(component.name)){

        RemiApp.injected.push(component)
        
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
