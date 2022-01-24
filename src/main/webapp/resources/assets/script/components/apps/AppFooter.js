export default {
    props: ['brand', 'menulist'],
    data() {
        return {
            footerClass: [
                'footer', 'bg-light', 'p-3', 'w-flex', 'justify-content-center justify-content-md-start'
            ]
        }
    },
    computed: {
        getCapitalize() {
            return (str) => {
                return str.split('-').map(st=>st.charAt(0).toUpperCase()+st.slice(1)).join(' ');
            }
        },
    },
    template: `
    <footer :class="footerClass">
        <span class="brand text-white fw-bold">
            <a href="index.html">{{brand}}</a>
        </span>
        <div class="w-flex justify-content-start ps-3 gx-3">

            <div
            v-for="(item, idx) in menulist"
            :key="idx">
                <a
                :href="'/'+item" class="nav-link">{{getCapitalize(item)}}</a>
            </div>
            
        </div>
    </footer>
    `,
}