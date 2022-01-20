export default {
    data() {
        return {
            tabs: [{
                    id: 0,
                    type: 'all'
                },
                {
                    id: 1,
                    type: 'bean'
                },
                {
                    id: 2,
                    type: 'coffee'
                },
                {
                    id: 3,
                    type: 'tea'
                },
                {
                    id: 4,
                    type: 'machine'
                },
                {
                    id: 5,
                    type: 'wear'
                },
            ],
            itemlist: null,
            wrapHeight: 0,
            cardCount: window.innerWidth-17<768?2:3,
        }
    },
    created() {
        this.itemlist = [
            {
                id: 0,
                name: 'test1',
                types: ['all', 'bean'],
                content: 'wow',
                star: 5,
                like: 10,
                pick: true,
            },
            {
                id: 1,
                name: 'test2',
                types: ['all', 'coffee'],
                content: 'wow',
                star: 5,
                like: 10,
                pick: true,
            },
            {
                id: 2,
                name: 'test3',
                types: ['all', 'wear'],
                content: 'wow',
                star: 5,
                like: 10,
                pick: true,
            },
        ]
        window.addEventListener('resize', ev => {
            const w = document.querySelector('.card-wrap');
            const wrap = [...w.children];
            if(window.innerWidth-17<992 && window.innerWidth-17>=768){
                this.cardCount = 3;
            } else if(window.innerWidth-17<768) {
                this.cardCount = 2;
            } else {
                this.cardCount = 4;
            }
            wrap.forEach((card, idx)=>{
                card.style.width = (w.clientWidth - (16*(this.cardCount-1))) / this.cardCount+'px';
                card.style.left = (card.clientWidth*(idx%this.cardCount)) + (16*(idx%this.cardCount)) +'px';
                card.style.top = card.clientHeight*(parseInt(idx/this.cardCount))+Math.floor(idx/this.cardCount)+'px';
            });
            let height = w.children[0].getBoundingClientRect().height;
            this.wrapHeight = Math.ceil([...w.children].length/this.cardCount);
            w.style.height = height*this.wrapHeight+'px';
        });
        window.addEventListener('click', ev => {
            const target = ev.target;
            const map = new Map(Object.entries(target.dataset));
            if(map.size==0) return;
            if(map.size>0 && map.get('type')){
                let type = map.get('type');
                this.itemlist.map((card)=>{
                    if(card.types.indexOf(type)>-1){
                        card.pick = true;
                    } else {
                        card.pick = false;
                    }
                    return card;
                });
            }
            this.filterListRender();
        })
    },
    mounted() {
        let wrap = document.querySelector('.card-wrap');
        this.wrapHeight = Math.ceil([...wrap.children].length/this.cardCount);
        let boxHeight = 0;
        let height = 0;
        let update = 0;
        function loop(){
            height = wrap.children[0].getBoundingClientRect().height;
            if(boxHeight == height){
                wrap.style.height = height*this.wrapHeight+'px';
                setTable.bind(this, [...wrap.children])();
                if(update>1){
                    cancelAnimationFrame(loop);
                } else {
                    requestAnimationFrame(loop.bind(this));
                }
            } else {
                update++;
                boxHeight = height;
                requestAnimationFrame(loop.bind(this));
            }
        }
        function setTable(array) {
            array.forEach((a, idx)=>{
                a.style.width = (wrap.clientWidth - (16*(this.cardCount-1))) / this.cardCount+'px';
                a.style.left = (a.clientWidth*(idx%this.cardCount)) + (16*(idx%this.cardCount)) +'px';
                a.style.top = a.clientHeight*(parseInt(idx/this.cardCount))+Math.floor(idx/this.cardCount)+'px';
            })
        }
        requestAnimationFrame(loop.bind(this));
    },
    computed: {
        uppercase() {
            return (str) => {
                return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            }
        },
    },
    methods: {
        filterListRender(){
            const w = document.querySelector('.card-wrap');
            const wrap = [...w.children];
            let idx = 0;
            if(window.innerWidth-17<992 && window.innerWidth-17>=768){
                this.cardCount = 3;
            } else if(window.innerWidth-17<768) {
                this.cardCount = 2;
            } else {
                this.cardCount = 4;
            }
            this.itemlist.forEach((card, cid)=>{
                if(card.pick){
                    w.children[cid].style.width = (w.clientWidth - (16*(this.cardCount-1))) / this.cardCount+'px';
                    w.children[cid].style.left = (w.children[idx].clientWidth*(idx%this.cardCount)) + (16*(idx%this.cardCount)) +'px';
                    w.children[cid].style.top = w.children[idx].clientHeight*(parseInt(idx/this.cardCount))+Math.floor(idx/this.cardCount)+'px';
                    idx++;
                }
            })
        }
    },
    template: `
    <div>
        <div class="w-flex justify-content-center btn-bundle mb-5">
            <button
            class="px-4 py-2 btn btn-frame-secondary"
            :data-type="item.type"
            v-for="item in tabs"
            :key="item.id">{{uppercase(item.type)}}</button>
        </div>
        <div
        class="card-wrap">
            <div
            v-for="item in itemlist"
            :data-link="item.types"
            :key="item.id"
            :class="['card', item.pick?'':'hide', 'card-pd-3']"
            style="width: calc((100% - 32px) / 3);">

                <img
                style="object-fit: cover; width: 100%;"
                src="https://picsum.photos/seed/picsum/300/200"
                alt="sample">

                <div class="card-title">{{item.name}}</div>

                <div class="card-content">
                    <div class="card-body">
                        {{item.content}}
                    </div>
                </div>

                <div class="w-flex justify-content-between vgap-1">
                    <div>
                        <module-star :isSolid="true"></module-star>
                        <module-heart></module-heart>
                    </div>
                    <button class="btn btn-info">담기</button>
                </div>

            </div>
        </div>
    </div>
    `
}