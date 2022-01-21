import MainBodyGreet from './main/MainBodyGreet.js';
import MainBodyNewitem from './main/MainBodyNewitem.js';
import MainBodyFeature from './main/MainBodyFeature.js';
import MainBodySearch from './main/MainBodySearch.js';

export default {
    template: `
    <main>
        <component
        is="main-body-greet"></component>
        <div class="horizon-pad"></div>
        <component
        is="main-body-newitem"></component>
        <div class="horizon-pad"></div>
        <component
        is="main-body-feature"></component>
        <div class="horizon-pad"></div>
        <component
        is="main-body-search"></component>
        <div class="horizon-pad"></div>
    </main>
    `,
    components: {
        MainBodyGreet,
        MainBodyNewitem,
        MainBodyFeature,
        MainBodySearch,
    }
}