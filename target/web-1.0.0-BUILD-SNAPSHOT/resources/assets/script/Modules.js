/**
 * 
 */
'use strict';

Vue.component('module-item-view', {
    props: ['modules', 'blockStar', 'starPoint'],
    template: `
    <div class="w-flex flex-column flex-row-lg vgap-3">
        <div class="col text-center text-start-lg" style="max-height: 350px; overflow: hidden">
            <img
            class="w-lg-100 w-auto"
            style="transform: translateY(-20%)"
            src="https://coffeecg.com/web/product/extra/big/202011/16b2ccef73764b235ef511baf745fc1f.jpg"
            alt="sample">
        </div>
        <div class="col">
            <div>
                <span class="h5">New Item</span>
                <component
                :starPoint="starPoint"
                :blockStar="blockStar?true:false"
                :is="modules??'module-line-star'"></component>
            </div>
            <div class="hr"></div>
            <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam quo voluptatum veniam sequi, laborum praesentium neque magni voluptate delectus aliquid eaque quas doloribus ipsam quaerat, commodi placeat dolore, ducimus perferendis?</p>
            </div>
            <div
            class="w-flex gap-1 my-3 flex-wrap">
                <span
                class="tag tag-info" v-for="i in 10">test{{i}}</span>
            </div>
            <div>
                <button class="btn btn-lg btn-info px-3 rounded-0">
                    like
                </button>
                <button class="btn btn-lg btn-frame-info px-3 rounded-0">
                    add to cart
                </button>
            </div>
        </div>
    </div>
    `
})

Vue.component('module-card', {
    props: ['item', 'isPrice'],
    computed: {
        autoComma(){
            return this.isPrice.toLocaleString()+'원';
        }
    },
    template: `
        <div>
            <img
            style="object-fit: cover; width: 100%;"
            :src="'https://picsum.photos/300/200?random='+item.id"
            alt="sample">

            <div class="card-title">{{item.name}}</div>

            <div class="card-content">
                <div class="card-body">
                    {{item.content}}
                </div>
            </div>

            <div class="w-flex justify-content-between vgap-1">
                <div v-if="!isPrice">
                    <module-star :isSolid="true"></module-star>
                    <module-heart></module-heart>
                </div>
                <div v-else>
                    price {{autoComma}}
                </div>
                <button class="btn btn-info">담기</button>
            </div>
        </div>
    `
})

Vue.component('module-line-star', {
    props: ['blockStar', 'starPoint'],
    data(){
        return{
            star: [
                {
                    id: 0,
                    for: 'star-0',
                    isFill: false,
                },
                {
                    id: 1,
                    for: 'star-1',
                    isFill: false,
                },
                {
                    id: 2,
                    for: 'star-2',
                    isFill: false,
                },
                {
                    id: 3,
                    for: 'star-3',
                    isFill: false,
                },
                {
                    id: 4,
                    for: 'star-4',
                    isFill: false,
                },
            ],
        }
    },
    created(){
        if(!this.blockStar)
        window.addEventListener('click', (ev)=>{
            const target = ev.target;
            if(target.tagName != 'LABEL') return ;

            this.star.map(s=>{
                s.isFill=false;
                return s;
            })

            for(let s of this.star){
                s.isFill = true;
                if(target.htmlFor == s.for){
                    break;
                }
            }
        })
        else {
            let loop = this.starPoint??3; // default 3
            for(let i=0; i<loop; i++){
                this.star[i].isFill = true;
            }
        }
    },
    template: `
    <span class="text-warning">
        <span
        v-for="(s,i) in star"
        :key="i">
            <label
            :for="'star-'+i">
                <ion-icon :name="'star'+(s.isFill?'':'-outline')"></ion-icon>
            </label>
            <input hidden :id="'star-'+i" type="radio" name="star" :value="i">
        </span>
    </span>
    `
})

Vue.component('module-star', {
    data(){
        return {
            isSolid: false,
        }
    },
    methods: {
        changeColor(){
            this.isSolid = !this.isSolid;
        }
    },
    template: `
    <span class="star fs-5">
        <span @click="changeColor"><ion-icon :name="'star'+(isSolid?'':'-outline')"></ion-icon></span>
        <span>3</span>
    </span>
    `
})

Vue.component('module-heart', {
    data(){
        return {
            isSolid: false,
        }
    },
    methods: {
        changeColor(){
            this.isSolid = !this.isSolid;
        }
    },
    template: `
    <span class="like fs-5">
        <span @click="changeColor"><ion-icon :name="'heart'+(isSolid?'':'-outline')"></ion-icon></span>
        <span>3</span>
    </span>
    `
})