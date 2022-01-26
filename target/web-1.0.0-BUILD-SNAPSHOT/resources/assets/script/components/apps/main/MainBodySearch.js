import SearchTable from './SearchTable.js';

export default {
    props: ['itemlist'],
    template: `
    <section class="fence-full fence-lg">
        <div>
            <component
            is="search-table"></component>
        </div>
    </section>
    `,
    components: {
        SearchTable,
    }
}