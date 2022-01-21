export default {
    props: ['menus'],
    computed: {
        getLowerCase() {
            return (str) => {
                if(str.match(/home/gim)) return '';
                return str.replace('-','').toLowerCase();
            }
        },
        getCapitalize() {
            return (str) => {
                return str.split('-').map(st=>st.charAt(0).toUpperCase()+st.slice(1)).join(' ');
            }
        },
    },
    template: `
    <ul id="gnbMenu" class="gnb-menu vgap-3 w-flex hide">
        <li v-for="(item, idx) in menus" :key="idx">
            <a class="nav-link" :href="'/'+getLowerCase(item)">{{getCapitalize(item)}}</a>
        </li>
        <li class="search btn-bundle g-0">
            <input
            type="text"
            class="form-input col"
            placeholder="검색어를 입력해주세요">
            <button class="btn btn-point">
                <ion-icon name="search-outline"></ion-icon>
            </button>
        </li>
    </ul>
    `
}