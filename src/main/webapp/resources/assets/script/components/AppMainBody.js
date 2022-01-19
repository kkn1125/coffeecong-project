import MainBodyGreet from './MainBodyGreet.js';
import MainBodyNewitem from './MainBodyNewitem.js';
import MainBodyFeature from './MainBodyFeature.js';
import MainBodyNews from './MainBodyNews.js';

export default {
    template: `
    <main>
        <component
        is="main-body-greet"></component>
        <component
        is="main-body-newitem"></component>
        <component
        is="main-body-feature"></component>
        <component
        is="main-body-news"></component>
    </main>
    `,
    components: {
        MainBodyGreet,
        MainBodyNewitem,
        MainBodyFeature,
        MainBodyNews,
    }
}