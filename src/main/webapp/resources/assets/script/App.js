/**
 * 
 */
'use strict';

import * as Modules from './Modules.js';

import AppNav from './components/apps/AppNav.js';
import AppMain from './components/apps/AppMain.js';
import AppMainBody from './components/apps/AppMainBody.js';
import AppFooter from './components/apps/AppFooter.js';
import AppParts from './components/apps/AppParts.js';

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