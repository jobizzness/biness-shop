import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

export class lightComponent extends PolymerElement {

    ready(){
        super.ready()
        // if(window.ShadyDOM){
        //     let style = document.head.
        // }
    }

    _attachDom(node) {
        dom(this).appendChild(node);
    }
}