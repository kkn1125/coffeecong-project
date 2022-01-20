import MainBodyGreet from './MainBodyGreet.js';
import MainBodyNewitem from './MainBodyNewitem.js';
import MainBodyFeature from './MainBodyFeature.js';
import MainBodySearch from './MainBodySearch.js';

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