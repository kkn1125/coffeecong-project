export default {
    props: ['brand'],
    data() {
        return {
            menulist: [ // bus 받기
                'mall'
            ],
            footerClass: [
                'footer', 'bg-light', 'p-3', 'w-flex', 'justify-content-center justify-content-md-start'
            ],
            filteredList: [],
        }
    },
    created(){
        this.filteredList = [...this.menulist.filter(x=>!x.match(/sign-/gm))];
    },
    computed: {
        getCapitalize() {
            return (str) => {
                return str.split('-').map(st=>st.charAt(0).toUpperCase()+st.slice(1)).join(' ');
            }
        },
    },
    template: `
    <footer
    :class="footerClass">
        <ModuleUserMenu/>
        <span class="brand text-white fw-bold">
            <a href="index.html">{{brand}}</a>
        </span>
        <div class="w-flex justify-content-start ps-3 gx-3">

            <div
            v-for="(item, idx) in filteredList"
            :key="idx">
                <a
                :href="'/'+item" class="nav-link">{{getCapitalize(item)}}</a>
            </div>
            
        </div>
    </footer>
    `,
}