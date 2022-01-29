export default {
    data(){
        return {
            menulist: [
                'mall',
            ],
            memberInfo: null,
        }
    },
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
    methods: {
        signout(ev){
            const target = ev.target;
            if(target.getAttribute('href') == '/'){
                ev.preventDefault();
                this.memberInfo.active = false;
                sessionStorage['member'] = JSON.stringify(this.memberInfo);
                location = '/?e=2'
            }
        }
    },
    template: `
    <ul id="gnbMenu" class="gnb-menu vgap-3 w-flex hide">
        <li v-for="(item, idx) in menulist" :key="idx">
            <a
            @click="signout"
            class="nav-link"
            :href="'/'+getLowerCase(item)">
            {{getCapitalize(item)}}</a>
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