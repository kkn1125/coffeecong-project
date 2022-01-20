/**
 * 
 */
'use strict';

import AppNav from './components/AppNav.js';
import AppMain from './components/AppMain.js';
import AppParts from './components/AppParts.js';
import AppFooter from './components/AppFooter.js';

Vue.config.ignoredElements = [/^ion-/];

Vue.component('module-star', {
    props: ['isSolid'],
    methods: {
        changeColor(){
            this.isSolid = !this.isSolid;
        }
    },
    template: `
    <span class="star fs-5">
        <span @click="changeColor"><ion-icon :name="'star'+(isSolid?'':'-outline')"></ion-icon></span>
        <span>3</span>
    </span>
    `
})

Vue.component('module-heart', {
    props: ['isSolid'],
    methods: {
        changeColor(){
            this.isSolid = !this.isSolid;
        }
    },
    template: `
    <span class="like fs-5">
        <span @click="changeColor"><ion-icon :name="'heart'+(isSolid?'':'-outline')"></ion-icon></span>
        <span>3</span>
    </span>
    `
})

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