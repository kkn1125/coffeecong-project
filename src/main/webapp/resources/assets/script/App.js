/**
 * 
 */
'use strict';

import AppNav from './components/AppNav.js';
import AppMain from './components/AppMain.js';
import AppParts from './components/AppParts.js';
import AppFooter from './components/AppFooter.js';

Vue.config.ignoredElements = [/^ion-/];

new Vue({
    el: '#app',
    data: {
        brand: 'CoffeeCong'
    },
    components: {
        AppNav,
        AppMain,
        ...AppParts,
        AppFooter,
    }
});