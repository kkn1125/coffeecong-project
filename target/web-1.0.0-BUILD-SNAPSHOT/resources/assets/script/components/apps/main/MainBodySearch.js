import SearchTable from './SearchTable.js';

export default {
    props: ['itemlist'],
    template: `
    <section class="fence-full fence-lg">
        <div>
            <SearchTable/>
        </div>
    </section>
    `,
    components: {
        SearchTable,
    }
}