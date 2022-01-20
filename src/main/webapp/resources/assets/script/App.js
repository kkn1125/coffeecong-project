/**
 * 
 */
'use strict';

import * as Modules from './Modules.js';

import AppNav from './components/AppNav.js';
import AppMain from './components/AppMain.js';
import AppMainBody from './components/AppMainBody.js';
import AppFooter from './components/AppFooter.js';
import AppParts from './components/AppParts.js';

Vue.config.ignoredElements = [/^ion-/];

new Vue({
    el: '#app',
    data: {
        brand: 'CoffeeCong'
    },
    components: {
        AppNav,
        AppMain,
        AppMainBody,
        AppFooter,
        ...AppParts,
    }
});