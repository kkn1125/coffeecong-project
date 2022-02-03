/**
 * 
 */
'use strict';

Object.defineProperty(Object.prototype, 'insertPad', {
    /**Object.defineProperty(Object.__proto__, 'insertPad', {
    /**
     * @param {int} length Insert string's max length.
     * @param {string} fillString Insert string.
     * @param {boolean} direction Direction to insert text.
     * @returns Filled strings
     */
    value: function (length, fillString, direction) {
        return direction ?
            this + (fillString ?.toString() ?.repeat(length) ?? '') :
            (fillString ?.toString() ?.repeat(length) ?? '') + this;
    },
    configurable: true,
});

Object.defineProperty(Object.prototype, 'stringToBinary', {
    value: function (binary=36) {
        return this.split('').map(s => s.charCodeAt(0).toString(binary)).map((x, i, o) => {
            if (i < o.length - 1) {
                return x + String.fromCharCode(65 + parseInt(Math.random() * 25));
            } else {
                return x;
            }
        }).join('');
    },
    configurable: true,
});

Object.defineProperty(Object.prototype, 'binaryToString', {
    value: function (binary=36) {
        return this.split(/[A-Z]+/gm).map(x => String.fromCharCode(parseInt(x, binary))).join('');
    },
    configurable: true,
});

Object.defineProperty(Object.prototype, 'lock', {
    value: function (binary=36) {
        return this.split('').map((x, i, o) => x.charCodeAt(0).toString(binary) + (i != o.length - 1 ? String.fromCharCode(parseInt(Math.random() * 25) + 65) : '')).join('');
    },
    configurable: true,
});

Object.defineProperty(Object.prototype, 'unlock', {
    value: function (binary=36) {
        return this.split(/[A-Z]+/gm).map((x, i, o) => String.fromCharCode(parseInt(x, binary))).join('');
    },
    configurable: true,
});

Object.filter = (obj, predicate) => 
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});

Vue.component('ModuleUserMenu', {
    data(){
        return {
            loggedIn: false,
            showModal: false,
            shadow: {
                boxShadow: '0 0 1rem 0 rgba(0,0,0,0.15)',
            },
            centerClass: 'w-flex align-items-center justify-content-center',
            badgeClass: 'rounded-circle bg-info text-white fs-1',
            fixed: 'position-fixed',
            roundBox: 'rounded-3 text-muted fw-bold bg-white',
            fixStyle: {
                right: '30px',
                bottom: '30px',
            },
            fixSize: {
                width: '50px',
                height: '50px',
            },
            list: {
                setting: {
                    name: '',
                    visible: this.loggedIn,
                },
                history: {
                    name: '주문 내역',
                    visible: this.loggedIn,
                },
                cart: {
                    name: '카트 보기',
                    visible: this.loggedIn,
                },
                // setting: {
                //     name: '회원 정보 수정',
                //     visible: this.loggedIn,
                // },
                signin : {
                    name: 'sign in',
                    visible: !this.loggedIn,
                },
                signup : {
                    name: 'sign up',
                    visible: !this.loggedIn,
                },
                '': {
                    name: '<ion-icon name="log-out-outline"></ion-icon> sign out',
                    visible: this.loggedIn,
                }
            },
            memberInfo: null,
        }
    },
    watch: {
        memberInfo: function (val, old){
            this.list.setting.name = val.id+'님 접속 중'
        }
    },
    methods: {
        setModal(ev){
            if(ev.target.closest('.User-modal-btn')) this.showModal = true;
            else this.showModal = false;
        },
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
    computed: {
        tempList(){
            return Object.filter(this.list, (value)=> value.visible);
        }
    },
    created(){
        window.addEventListener('click', this.setModal);

        this.memberInfo = sessionStorage['member']?JSON.parse(sessionStorage['member']):null;

        if(this.memberInfo && this.memberInfo.active){
            Object.keys(this.list).forEach(x=>this.list[x].visible = !this.list[x].visible);
        } else {
            Object.keys(this.list).forEach(x=>this.list[x].visible = this.list[x].visible);
        }
    },
    beforeDestroy() {
        window.removeEventListener('click', this.setModal);
    },
    template: `
        <div
        :class="[ centerClass, badgeClass, fixed, 'User-modal-btn' ]"
        :style="[ fixStyle, fixSize, {cursor: 'pointer'} ]"
        >
            <ion-icon name="person-circle-outline"></ion-icon>
            <div
            v-if="showModal"
            :class="[ fixed, roundBox, 'User-modal' ]"
            :style="[ fixStyle, {width: '200px', cursor: 'auto'}, shadow ]">
                <ul class="list-group fs-7">
                    <li
                    style="text-transform: none;"
                    class="list-item ps-3"
                    v-for="(v, k, i) in tempList"
                    :key="i">
                        <a
                        @click="signout"
                        :href="'/'+k"
                        v-html="v.name">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `
})

Vue.component('ModuleSlide', {
    props: ['itemlist', 'clickOff'],
    data(){
        return {
            originWidth: 0,
            first: 0,
            click: false,
            autoSliding: false,
            dragBefore: 0,
            direction: false,
            slideSpeed: 10,
        }
    },
    created(){
        window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    },
    beforeDestroy() {
        window.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mouseup', this.handleMouseMove);
    },
    methods: {
        handleMouseDown(ev){
            const target = ev.target;
            if(!target.closest('.img-slide')) return;

            this.first = ev.clientX;
            this.originWidth = target.closest('.img-slide').scrollLeft;
            this.click = true;
        },
        handleMouseUp(ev){
            this.click = false;
            this.autoSliding = false;
        },
        handleMouseMove(ev){
            if(this.click){
                const target = document.querySelector('.img-slide');
                target.scrollTo(this.originWidth-(ev.clientX-this.first), target.scrollHeight);
                if(this.dragBefore<target.scrollLeft) this.direction = true; // right
                else this.direction = false; // left
                this.dragBefore = target.scrollLeft;
            }
        },
        prevMove(ev){
            const target = document.querySelector('.img-slide');
            this.autoSliding = true;
            let loop = setInterval(() => {
                target.scrollLeft -= this.slideSpeed;
                if(!this.autoSliding) clearInterval(loop);
            }, 10);
        },
        nextMove(ev){
            const target = document.querySelector('.img-slide');
            this.autoSliding = true;
            let loop = setInterval(() => {
                target.scrollLeft += this.slideSpeed;
                if(!this.autoSliding) clearInterval(loop);
            }, 10);
        },
    },
    computed: {
        limitItemList(){
            return this.itemlist.slice(-5);
        }
    },
    template: `
    <div class="img-slide-wrap">
        <div
        @mousedown="prevMove"
        class="arrow-left h2 text-muted">
            <ion-icon name="caret-back-outline"></ion-icon>
        </div>
        <div class="img-slide mx-5 col">
            <div
            style="flex-shrink: 0;"
            class="img-item"
            v-for="item in limitItemList">
                <div class="info-box">
                    <component :is="!clickOff?'ModuleStar':''" :isSolid="true"></component>
                    <component :is="!clickOff?'ModuleHeart':''"></component>
                </div>
                <img
                style="height: 100%; object-fit: cover;"
                :src="item.image"
                alt="sample">
            </div>
        </div>
        <div
        @mousedown="nextMove"
        class="arrow-right h2 text-muted">
            <ion-icon name="caret-forward-outline"></ion-icon>
        </div>
    </div>
    `
})

Vue.component('ModuleReview', {
    props: ['num'],
    data(){
        return{
            view: 3,
            isSolid: true,
        }
    },
    template: `
    <div class="w-flex flex-column">
        <div class="w-flex flex-column hgap-3">
            <div
            class="w-flex justify-content-between">
                <div
                class="w-flex flex-column align-items-start justify-content-center">
                    <div>
                        <span>Review</span>
                        <span class="text-warning">({{view}})</span>
                    </div>
                    <div>
                        <ModuleLineStar></ModuleLineStar>
                    </div>
                </div>
                <div class="w-flex align-items-center vgap-3">
                    <button class="btn btn-success">
                        <ion-icon name="camera-outline"></ion-icon>
                    </button>
                    <button class="btn btn-info">등록</button>
                </div>
            </div>
            <div>
                <textarea
                name="content"
                rows="10"
                class="form-input w-100"
                style="resize: vertical;"></textarea>
            </div>
        </div>
        <div class="horizon-pad"></div>
        <CommentWrap
        :num="num"></CommentWrap>
    </div>
    `
})

Vue.component('CommentWrap', {
    props: ['num'],
    data(){
        return {
            reviews: [],
        }
    },
    mounted() {
        axios({
            method: 'get',
            url: `/comment/pnum/${this.num}`
        }).then(response=>this.reviews = response.data)
        .catch(e=>console.log(e));
    },
    template: `
        <div class="w-flex flex-column hgap-3">
            <ModuleComment
            v-for="(item, idx) in 3"
            :item="item"
            :key="idx"></ModuleComment>
            <div
            v-if="reviews.length==0"
            class="notice notice-danger">
                등록된 리뷰가 없습니다.
            </div>
        </div>
    `
})

Vue.component('ModuleComment',{
    props: ['item'],
    template: `
        <div class="w-flex flex-column border border-light p-3 rounded-3">
            <div class="w-flex justify-content-between align-items-center mb-3">
                <div class="w-flex align-items-center hgap-3">
                    <div>
                        <img src="" alt="">
                    </div>
                    <div class="w-flex flex-column align-items-start">
                        <div>
                            name
                        </div>
                        <div>
                            time
                        </div>
                    </div>
                </div>
                <div class="w-flex flex-column align-items-end">
                    <ModuleLineStar
                    :blockStar="true"
                    :startPoint="item.star"></ModuleLineStar>
                    <div>
                        <span>
                            <button class="btn btn-success">수정</button>
                        </span>
                        <span>
                            <button class="btn btn-danger">삭제</button>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <p class="mb-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid laborum sint praesentium vel vero quidem assumenda velit. Impedit, veniam ipsam. Totam cupiditate quisquam non blanditiis quos maxime minus deleniti repudiandae.
                </p>
                <span>
                    <span
                    class="tag tag-info"
                    v-for="i in 5">
                        tags
                    </span>
                </span>
            </div>
        </div>
    `
})

Vue.component('OrderView', {
    props: ['item'],
    data(){
        return {
            images: [],
            capacity: 0,
            selected: '',
        }
    },
    watch: {
        item: function (){
            axios({
                method: 'get',
                url: '/productimg/pnum/'+this.item.num
            }).then(response=>{
                this.images.concat(response.data);
                this.images.push({image: this.item.image});
                console.log(this.images)
            }).catch(e=>console.log(e));
        }
    },
    computed: {
        getItem(){
            console.log(this.item)
            return this.item??false;
        },
        getContent(){
            const items = this.item??false;
            return new DOMParser().parseFromString(items.content, 'text/html').body.textContent.trim()||'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, facilis dolorum ratione ab voluptatum odio illo.';
        },
        getImages(){
            return this.images;
        },
        getPrice(){
            return this.getItem.price?.toLocaleString();
        },
        getSumPrice(){
            return (this.getItem.price * this.capacity).toLocaleString();
        }
    },
    template: `
        <div
        class="w-flex vgap-3">
            <div class="col-10">
                <img
                class="w-100"
                :src="getItem.image"
                alt="image">
                <ModuleSlide
                :clickOff="true"
                :itemlist="getImages"></ModuleSlide>
            </div>
            <div class="col">
                <div class="mb-3">
                    <span class="h4">{{getItem.title}}</span>
                    <ModuleHeart></ModuleHeart>
                </div>
                <div v-html="getContent"></div>
                <div
                class="w-flex flex-column hgap-2">
                    <div class="w-flex justify-content-between align-items-center vgap-2">
                        <span class="col">상품 종류</span>
                        <span class="col">
                            <select
                            v-model="selected"
                            class="form-select w-100 text-center"
                            name="category">
                                <option value="">---선택해주세요---</option>
                                <option
                                :value="getItem.title">{{getItem.title}}</option>
                            </select>
                        </span>
                    </div>
                    <div class="w-flex justify-content-between align-items-center vgap-2">
                        <span class="col">상품 수량</span>
                        <span class="col w-flex justify-content-between">
                            <span>{{getPrice}}</span>
                            <input
                            class="form-input w-50"
                            type="number"
                            v-model="capacity"
                            min="0"
                            :max="getItem.capacity"
                            pattern="[0-9]+">
                        </span>
                    </div>
                    <div class="w-flex justify-content-between align-items-center vgap-2">
                        <span class="col">합계</span>
                        <span class="col text-end fw-bold">
                            <span>{{getSumPrice}} 원</span>
                        </span>
                    </div>
                </div>
                <div class="btn-bundle justify-content-end">
                    <button class="btn btn-danger px-3">찜하기</button>
                    <button class="btn btn-info px-3">장바구니</button>
                </div>
            </div>
        </div>
    `
})

Vue.component('ModuleInputId', {
    props: ['id'],
    computed: {
        idValue: {
            get(){
                return this.id;
            },
            set(val){
                this.$emit('inputId', val);
            }
        }
    },
    template: `
        <div class="position-relative w-100">
            <input required
            v-model="idValue"
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

Vue.component('ModuleInputEmail', {
    props: ['email'],
    computed: {
        emailValue: {
            get(){
                return this.email;
            },
            set(val){
                this.$emit('inputEmail', val);
            }
        }
    },
    template: `
        <div class="position-relative w-100">
            <input required
            v-model="emailValue"
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

Vue.component('ModuleBreadcrumb', {
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

Vue.component('ModuleSignup', {
    props: ['orders', 'showPass'],
    data(){
        return {
            isError: false,
            result: null,
        }  
    },
    methods: {
        visibleToggle(ev){
            this.$emit('visible');
        },
        validId(ev){
            if(ev.target.name != 'id') return ;
            this.isError = false;

            axios({
                method: 'get',
                url: `/member/id/${ev.target.value}`
            })
            .then(response=>{
                this.result = response.data;
                this.$emit('sendCheckId', this.result);
            })
            .catch(e=>this.isError = true);
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
                    <div class="checkId" v-if="item.id==1">
                        {{isError?'Loading...':(result==''?'사용가능한 아이디입니다.':result!=null?'아이디가 중복됩니다.':'')}}
                    </div>
                    <input required
                    @keyup.prevent="validId"
                    v-for="i in item.input"
                    :name="i.name"
                    v-bind="i.options"
                    class="form-input form-input-lg"
                    v-model="i.options.value"
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

Vue.component('ModuleInputPassword', {
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

Vue.component('ModuleItemView', {
    props: ['modules', 'blockStar', 'starPoint', 'recentItem'],
    data(){
        return {
            taglist: [],
        }
    },
    computed: {
        getRecent(){
            return this.recentItem??false;
        },
        filterTagContent(){
            const str = new DOMParser().parseFromString((this.recentItem??false).content, 'text/html').body.textContent;
            return str!=''?str:'No Contents';
        },
        getTagList(){
            if(this.recentItem){
                axios({
                    method: 'get',
                    url: `/producttag/pnum/${this.recentItem.num}`
                })
                .then(response=>{
                    this.taglist = response.data.content?.split(',')
                })
                .catch(e=>console.log(e));
            }
            return this.taglist;
        },
        getPath(){
            if(this.recentItem){
                return this.recentItem.num;
            }
        }
    },
    template: `
    <div class="w-flex flex-column flex-row-lg vgap-3">
        <div class="col text-center text-start-lg w-100" style="max-height: 350px; overflow: hidden">
            <a
            :href="'/mall/'+getPath">
                <img
                class="w-lg-100 w-auto"
                style="transform: translateY(-20%)"
                :src="getRecent.image"
                alt="sample">
            </a>
        </div>
        <div class="col">
            <div>
                <span class="h5">{{getRecent.title}}</span>
                <component
                :starPoint="starPoint"
                :blockStar="blockStar?true:false"
                :is="modules??'ModuleLineStar'"></component>
            </div>
            <div class="hr"></div>
            <div>
                <p>
                    {{filterTagContent}}
                </p>
            </div>
            <div
            class="w-flex gap-1 my-3 flex-wrap">
                <span
                class="tag tag-info"
                v-for="(tag, idx) in getTagList"
                :key="idx">{{tag}}</span>
                <span
                v-if="!getTagList||getTagList.length==0"
                class="tag tag-danger"
                >태그가 없습니다.</span>
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

Vue.component('ModuleList', {
    props: ['item', 'isPrice'],
    computed: {
        autoComma(){
            return this.isPrice.toLocaleString()+'원';
        },
        filteredContent(){
            let str = new DOMParser().parseFromString(this.item.content, 'text/html').body.textContent;
            return str.length>0?str:'No Contents';
        },
        getPath(){
            if(this.item){
                return this.item.num;
            }
        }
    },
    template: `
        <li>
            <a :href="'/mall/'+getPath">
                <span class="w-inline-block w-100">
                    <img
                    style="object-fit: cover; width: 100%;"
                    :src="item.image"
                    alt="sample">
                </span>
                <span class="w-flex flex-column justify-content-between hgap-3 col">
                    <span class="fs-3 fw-bold">{{item.name}}</span>
                    <span class="cut col align-self-center">
                        {{filteredContent}}
                    </span>
                    <span class="w-inline-flex justify-content-start align-items-center vgap-3">
                        <span v-if="!isPrice">
                            <ModuleStar :isSolid="true"></ModuleStar>
                            <ModuleHeart></ModuleHeart>
                        </span>
                        <span v-else>
                            price {{autoComma}}
                        </span>
                        <button class="btn btn-info">담기</button>
                    </span>
                </span>
            </a>
        </li>
    `
});

Vue.component('ModuleGroupList', {
    template: `
        <ul>
            <slot></slot>
        </ul>
    `
});

Vue.component('ModuleGroupCard', {
    template: `
        <div class="">
            <slot></slot>
        </div>
    `
});

Vue.component('ModuleCard', {
    props: ['item', 'isPrice'],
    computed: {
        autoComma(){
            return this.isPrice.toLocaleString()+'원';
        },
        removeImageTag(){
            return (str)=>{
                return new DOMParser().parseFromString(str, 'text/html').body.textContent;
            }
        },
        getPath(){
            if(this.item){
                return this.item.num;
            }
        }
    },
    template: `
        <div>
            <a
            :href="'/mall/'+getPath">
                <img
                style="object-fit: cover; width: 100%;"
                :src="item.image"
                alt="sample">
            </a>

            <div class="card-title">
                <a
                :href="'/mall/'+getPath">
                    {{item.title}}
                </a>
            </div>

            <div class="card-content">
                <div class="card-body">
                    {{removeImageTag(item.content)}}
                </div>
            </div>

            <div class="w-flex justify-content-between vgap-1">
                <div v-if="!isPrice">
                    <ModuleStar :isSolid="true"></ModuleStar>
                    <ModuleHeart></ModuleHeart>
                </div>
                <div v-else>
                    price {{autoComma}}
                </div>
                <button class="btn btn-info">담기</button>
            </div>
        </div>
    `
});

Vue.component('ModuleLineStar', {
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

Vue.component('ModuleStar', {
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

Vue.component('ModuleHeart', {
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