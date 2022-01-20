import MainBodyNewitem from './MainBodyNewitem.js';

export default {
    template: `
    <section class="fence-full fence-lg">
        <module-item-view
        :modules="'module-star'"></module-item-view>
    </section>
    `,
    components: {
        MainBodyNewitem
    }
}