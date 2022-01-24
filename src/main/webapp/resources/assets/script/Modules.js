/**
 * 
 */
'use strict';

Object.defineProperty(Object.prototype, 'insertPad', {
    /**
     * 
     * @param {int} length Insert string's max length.
     * @param {string} fillString Insert string.
     * @param {boolean} direction Direction to insert text.
     * @returns Filled strings
     */
    value: function (length, fillString, direction){
        return direction
        ?this+(fillString?.toString()?.repeat(length)??'')
        :(fillString?.toString()?.repeat(length)??'')+this;
    }
});

Object.defineProperty(Object.prototype, 'stringToBinary', {
    value: function (binary){
        return this.split('').map(s=>s.charCodeAt(0).toString(binary)).map((x,i,o)=>{
            if(i<o.length-1){
                return x+String.fromCharCode(65+parseInt(Math.random()*25));
            } else {
                return x;
            }
        }).join('');
    }
});

Object.defineProperty(Object.prototype, 'binaryToString', {
    value: function (binary){
        return this.split(/[A-Z]+/gm).map(x=>String.fromCharCode(parseInt(x, binary))).join('');
    }
});

Vue.component('module-input-id', {
    props: ['values'],
    methods: {
        sendValue(ev){
            this.$emit('sendV', ['id', ev.target.value]);
        }
    },
    template: `
        <div class="position-relative w-100">
            <input required
            @keyup="sendValue"
            :value="values"
            pattern="[A-z0-9]+"
            name="id"
            class="form-input form-input-lg w-100"
            style="padding-left: 2rem;"
            type="text"
            autocomplete="username">
            <ion-icon
            class="position-absolute"
            style="top: 23%; left: 0.5rem;"
            name="albums-outline"></ion-icon>
        </div>
    `
});

Vue.component('module-breadcrumb', {
    props: ['orders', 'current'],
    data(){
        return {
        }
    },
    template: `
        <div class="breadcrumb">
            <span
            :class="['fs-5 rounded-circle', {tag: true,'tag-danger': current==item.id,'tag-light': current!=item.id,}]"
            v-for="item in orders">
            {{item.id+1}}
            </span>
        </div>
    `
})

Vue.component('module-signup', {
    props: ['orders', 'showPass'],
    methods: {
        visibleToggle(ev){
            console.log(ev)
            this.$emit('visible')
        }
    },
    template: `
        <div
        style="min-height: 300px;"
        class="form-signup col-15 text-center mx-auto">
            <div
            v-for="item in orders"
            :class="['signup', item.show?'':'hide']"
            :key="item.id">
                <div class="mb-5">
                    <span class="h3">{{item.title}}</span>
                </div>
                <div class="w-flex flex-column hgap-2">
                    <input required
                    v-for="i in item.input"
                    :name="i.name"
                    v-bind="i.options"
                    class="form-input form-input-lg"
                    :type="showPass?'text':i.type??'text'">
                    <div v-if="item.id==1">
                        <input
                        @change="visibleToggle"
                        type="checkbox"
                        name="showPass"
                        id="showPass">
                        <label for="showPass">
                            {{showPass?'비밀번호 숨기기':'비밀번호 보기'}}
                        </label>
                    </div>
                </div>
                <div class="error"></div>
            </div>
        </div>
    `
});

Vue.component('module-input-email', {
    props: ['values'],
    methods: {
        sendValue(ev){
            this.$emit('sendV', ['email',ev.target.value]);
        }
    },
    template: `
        <div class="position-relative w-100">
            <input required
            @keyup="sendValue"
            :value="values"
            name="email"
            class="form-input form-input-lg w-100"
            style="padding-left: 2rem;"
            type="email"
            autocomplete="username">
            <ion-icon
            class="position-absolute"
            style="top: 23%; left: 0.5rem;"
            name="mail-outline"></ion-icon>
        </div>
    `
});

Vue.component('module-input-password', {
    props: ['showPass'],
    template: `
        <div class="position-relative w-100">
            <input required
            name="password"
            class="form-input form-input-lg w-100"
            style="padding-left: 2rem;"
            :type="!showPass?'password':'text'"
            autocomplete="current-password">
            <ion-icon
            class="position-absolute"
            style="top: 23%; left: 0.5rem;"
            name="key-outline"></ion-icon>
        </div>
    `
});

Vue.component('module-item-view', {
    props: ['modules', 'blockStar', 'starPoint', 'recentItem'],
    computed: {
        getRecent(){
            return this.recentItem??false;
        }
    },
    template: `
    <div class="w-flex flex-column flex-row-lg vgap-3">
        <div class="col text-center text-start-lg w-100" style="max-height: 350px; overflow: hidden">
            <img
            class="w-lg-100 w-auto"
            style="transform: translateY(-20%)"
            :src="getRecent.image"
            alt="sample">
        </div>
        <div class="col">
            <div>
                <span class="h5">{{getRecent.title}}</span>
                <component
                :starPoint="starPoint"
                :blockStar="blockStar?true:false"
                :is="modules??'module-line-star'"></component>
            </div>
            <div class="hr"></div>
            <div>
                <p v-html="getRecent.content"></p>
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
});

Vue.component('module-list', {
    props: ['item', 'isPrice'],
    computed: {
        autoComma(){
            return this.isPrice.toLocaleString()+'원';
        }
    },
    template: `
        <li>
            <span>
                <img
                style="object-fit: cover; width: 100%;"
                :src="'https://picsum.photos/300/200?random='+item.id"
                alt="sample">
            </span>
            <span class="w-flex flex-column justify-content-between hgap-3 col">
                <span class="fs-3 fw-bold">{{item.name}}</span>
                <span class="cut col align-self-center">
                    {{item.content}}
                </span>
                <span class="w-inline-flex justify-content-start align-items-center vgap-3">
                    <span v-if="!isPrice">
                        <module-star :isSolid="true"></module-star>
                        <module-heart></module-heart>
                    </span>
                    <span v-else>
                        price {{autoComma}}
                    </span>
                    <button class="btn btn-info">담기</button>
                </span>
            </span>
        </li>
    `
});

Vue.component('module-group-list', {
    template: `
        <ul>
            <slot></slot>
        </ul>
    `
});

Vue.component('module-group-card', {
    template: `
        <div class="">
            <slot></slot>
        </div>
    `
});

Vue.component('module-card', {
    props: ['item', 'isPrice'],
    computed: {
        autoComma(){
            return this.isPrice.toLocaleString()+'원';
        },
        removeImageTag(){
            return (str)=>{
                return new DOMParser().parseFromString(str, 'text/html').body.textContent;
            }
        }
    },
    template: `
        <div>
            <img
            style="object-fit: cover; width: 100%;"
            :src="item.image"
            alt="sample">

            <div class="card-title">{{item.title}}</div>

            <div class="card-content">
                <div class="card-body">
                    {{removeImageTag(item.content)}}
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
});

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
});

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
});

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
});