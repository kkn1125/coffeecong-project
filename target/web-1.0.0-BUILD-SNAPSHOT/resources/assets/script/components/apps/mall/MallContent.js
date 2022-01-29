export default {
    data(){
        return {
            min: 0,
            max: 0,
            type: 'bean',
            priceGauge: 100,
            viewMode: false,
            params: null,
            limit: 6,
            itemlistTemp: [],
            itemlist: [],
        }
    },
    created(){
        this.params = new Map(location.search.slice(1).split('&').map(x=>x.split('=')));
        const type = this.params?.get('type');

        this.type = location.search==''?this.type:type??this.type;
        
        axios({
            method: 'get',
            url: '/product/category/'+this.type,
        })
        .then(response=>{
            this.itemlist = response.data;

            this.itemlistTemp = [...this.itemlist];
            this.min = this.itemlistTemp.sort((a,b)=>a.price-b.price)[0].price;
            this.max = this.itemlistTemp.sort((a,b)=>b.price-a.price)[0].price;
            this.itemlistTemp.sort((a,b)=>a.id-b.id);
        })
        .catch(e=>console.log(e));
    },
    methods: {
        changeView(ev) {
            this.viewMode = !this.viewMode;
        },
        priceFilter(ev){
            return (((this.max-this.min)/100) * this.priceGauge) + this.min;
        },
        ordering(ev){
            switch(ev.target.value){
                case 'price-down':
                    this.itemlistTemp = this.itemlist.sort((a,b)=>a.price-b.price);
                break;
                case 'price-up':
                    this.itemlistTemp = this.itemlist.sort((a,b)=>b.price-a.price);
                break;
                case 'product-up':
                    this.itemlistTemp = this.itemlist.sort((a,b)=>a.pname.localeCompare(b.pname));
                break;
                case 'product-down':
                    this.itemlistTemp = this.itemlist.sort((a,b)=>b.pname.localeCompare(a.pname));
                break;
            }
        }
    },
    computed: {
        computedPrice(){
            return parseInt(this.priceFilter()) + '원';
        },
        showCard(){
            let page = this.params?.get('page')??1;
            let max = parseInt(page)*this.limit;
            let temp = [...this.itemlist].filter(x=>x.price<=this.priceFilter());
            if(this.itemlistTemp.length != temp.length){
                this.itemlistTemp = temp;
            }
            if(max>this.itemlistTemp.length){
                return this.itemlistTemp.slice((parseInt(page)-1)*this.limit);
            } else {
                return this.itemlistTemp.slice((parseInt(page)-1)*this.limit, max);
            }
        },
        totalPage(){
            return Math.ceil(this.itemlistTemp.length/this.limit);
        },
    },
    template: `
    <section class="fence-full fence-lg">
        <div
        class="w-flex justify-content-end align-items-center vgap-3">
            <span>
                <span class="text-muted fs-8">
                    {{computedPrice}}
                </span>
                <input
                v-model="priceGauge"
                type="range"
                name="price"
                id="price">
            </span>
            <span>
                <select
                @change="ordering"
                class="form-select" name="order" id="order">
                    <option value="product-up">상품명 오름차순</option>
                    <option value="product-down">상품명 내림차순</option>
                    <option value="price-down">낮은 가격</option>
                    <option value="price-up">높은 가격</option>
                </select>
            </span>
            <span class="fs-3" @click="changeView">
                <ion-icon name="grid-outline"></ion-icon>
            </span>
        </div>

        <component
        :is="viewMode?'ModuleGroupList':'ModuleGroupCard'"
        :class="viewMode?'list-group':'card-group card-dv-2 card-dv-lg-3'">
            <component
            :is="viewMode?'ModuleList':'ModuleCard'"
            v-for="(item) in showCard"
            :isPrice="item.price"
            :class="viewMode?'list-item py-3 w-flex justify-content-between vgap-5':'card'"
            :key="item.id"
            :item="item">
            </component>
        </component>

        <div
        class="paginate btn-bundle">
            <a
            :href="'?page='+i+(type?'&type='+type:'')"
            class="btn btn-frame-info px-3"
            v-for="i in totalPage">{{i}}</a>
        </div>
    </section>
    `
}