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
        <MainBodyGreet/>
        <div class="horizon-pad"></div>
        <MainBodyNewitem
        :recentItem="recentItem"/>
        <div class="horizon-pad"></div>
        <MainBodyFeature
        :itemlist="itemlist"/>
        <div class="horizon-pad"></div>
        <MainBodySearch
        :itemlist="itemlist"/>
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