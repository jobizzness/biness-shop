/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from '@polymer/polymer/polymer-element.js';
import { PageViewElement } from "../../components/page-view-element";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import { store } from '../../store.js';
import template from './template.html';
import Chart from 'chart.js';

import { InjectGlobalStyle } from '../../core/utils.js';
InjectGlobalStyle({ name: 'remi-dashboard' }, () => import('./style.html'));

/**
 * `bn-project` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class RemiDashboard extends connect(store)(PageViewElement) {

    static get template() {
        return html([
            template
        ]);
    }

    /**
    * Object describing property-related metadata used by Polymer features
    */
    static get properties() {
        return {}
    }


    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    /**
     * Use for one-time configuration of your component after local DOM is initialized. 
     */
    ready() {
        super.ready();
        afterNextRender(this, () => this._initializeChart())
        
    }


    _initializeChart() {
        let data = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "January", "February", "March", "April"
            ],
            datasets: [{
                label: "Sales Stats",
                borderColor: '#34bfa3',
                borderWidth: 2,
                pointBackgroundColor: '#34bfa3',

                backgroundColor: '#34bfa3',

                pointHoverBackgroundColor: '#34bfa3',
                pointHoverBorderColor: '#34bfa3',
                data: [
                    10, 20, 16,
                    18, 12, 40,
                    35, 30, 33,
                    34, 45, 40,
                    60, 55, 70,
                    65, 75, 62
                ]
            }]
        }
        let chart = new Chart(this.$.profits, {
            type: 'line',
            data: data,
            options: {
                title: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest',
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: false,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                },

                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,

                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                }
            }
        });
    }

    _stateChanged(state){
        
    }
}

customElements.define('remi-dashboard', RemiDashboard);