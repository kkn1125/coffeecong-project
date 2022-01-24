export default {
    data(){
        return {
            priceGauge: 100,
            currentPrice: 'None',
            viewMode: false,
            beforeValue: 0,
            readyRange: false,
            params: null,
            limit: 6,
            itemlistTemp: null,
            itemlist: [
                {
                    id: 0,
                    name: 'test1',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 15000,
                },
                {
                    id: 1,
                    name: 'test2',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 25000,
                },
                {
                    id: 2,
                    name: 'test3',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 15000,
                },
                {
                    id: 3,
                    name: 'test4',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 35000,
                },
                {
                    id: 4,
                    name: 'test5',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 10000,
                },
                {
                    id: 5,
                    name: 'test6',
                    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia sit eum, odit in ut quaerat incidunt, nisi earum vel quo harum eos quasi dolorum totam at aliquam quisquam labore suscipit!',
                    price: 8000,
                },
            ]
        }
    },
    created(){
        this.itemlistTemp = [...this.itemlist];
        this.min = this.itemlistTemp.sort((a,b)=>a.price-b.price)[0].price;
        this.max = this.itemlistTemp.sort((a,b)=>b.price-a.price)[0].price;
        this.itemlistTemp.sort((a,b)=>a.id-b.id);
        this.params = location.search.slice(1).split('&').map(s=>{
            if(s){
                return new Map([s.split('=')]);
            } else {
                return s;
            }
        }).pop();
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
                    this.itemlistTemp = this.itemlist.sort((a,b)=>a.name.localeCompare(b.name));
                break;
                case 'product-down':
                    this.itemlistTemp = this.itemlist.sort((a,b)=>b.name.localeCompare(a.name));
                break;
            }
        }
    },
    computed: {
        computedPrice(){
            return this.priceFilter() + '원';
        },
        showCard(){
            let page = this.params.size>0?this.params.get('page'):1;
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
        :is="viewMode?'module-group-list':'module-group-card'"
        :class="viewMode?'list-group':'card-group card-dv-2 card-dv-lg-3'">
            <component
            :is="viewMode?'module-list':'module-card'"
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
            :href="'?page='+i"
            class="btn btn-frame-info px-3"
            v-for="i in totalPage">{{i}}</a>
        </div>
    </section>
    `
}