export default {
    data(){
        return {
            params: null,
            limit: 6,
            itemlist: [
                {
                    id: 0,
                    name: 'test1',
                    price: 15000
                },
                {
                    id: 1,
                    name: 'test2',
                    price: 25000
                },
                {
                    id: 2,
                    name: 'test3',
                    price: 15000
                },
                {
                    id: 3,
                    name: 'test4',
                    price: 35000
                },
                {
                    id: 4,
                    name: 'test5',
                    price: 10000
                },
                {
                    id: 5,
                    name: 'test6',
                    price: 8000
                },
            ]
        }
    },
    created(){
        this.params = location.search.slice(1).split('&').map(s=>{
            if(s){
                return new Map([s.split('=')]);
            } else {
                return s;
            }
        }).pop();
    },
    methods: {
        ordering(ev){
            switch(ev.target.value){
                case 'price-down':
                    this.itemlist = this.itemlist.sort((a,b)=>a.price-b.price);
                break;
                case 'price-up':
                    this.itemlist = this.itemlist.sort((a,b)=>b.price-a.price);
                break;
                case 'product-up':
                    this.itemlist = this.itemlist.sort((a,b)=>a.name.localeCompare(b.name));
                break;
                case 'product-down':
                    this.itemlist = this.itemlist.sort((a,b)=>b.name.localeCompare(a.name));
                break;
            }
        }
    },
    computed: {
        showCard(){
            let page = this.params.size>0?this.params.get('page'):1;
            let max = parseInt(page)*this.limit;
            if(max>this.itemlist.length){
                return this.itemlist.slice((parseInt(page)-1)*this.limit);
            } else {
                return this.itemlist.slice((parseInt(page)-1)*this.limit, max);
            }
        },
        totalPage(){
            return Math.ceil(this.itemlist.length/this.limit);
        },
    },
    template: `
    <section class="fence-full fence-lg">
        <div
        class="w-flex justify-content-end align-items-center vgap-3">
            <span>
                <input class="form-input form-input-sm" type="range" name="price" id="price">
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
            <span class="fs-3">
                <ion-icon name="grid-outline"></ion-icon>
            </span>
        </div>

        <div class="card-group card-dv-2 card-dv-lg-3">
            <module-card
            v-for="(item) in showCard"
            :isPrice="item.price"
            :class="['card']"
            :key="item.id"
            :item="item">
            </module-card>
        </div>

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