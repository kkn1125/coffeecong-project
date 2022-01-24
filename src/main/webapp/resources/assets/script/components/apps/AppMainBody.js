import MainBodyGreet from './main/MainBodyGreet.js';
import MainBodyNewitem from './main/MainBodyNewitem.js';
import MainBodyFeature from './main/MainBodyFeature.js';
import MainBodySearch from './main/MainBodySearch.js';

export default {
    props: ['itemlist'],
    computed: {
        recentItem(){
            return [...this.itemlist].sort((a,b)=>a.regdate-b.regdate).slice(-1).pop();
        }
    },
    template: `
    <main>
        <component
        is="main-body-greet"></component>
        <div class="horizon-pad"></div>
        <component
        :recentItem="recentItem"
        is="main-body-newitem"></component>
        <div class="horizon-pad"></div>
        <component
        :itemlist="itemlist"
        is="main-body-feature"></component>
        <div class="horizon-pad"></div>
        <component
        :itemlist="itemlist"
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