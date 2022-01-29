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
            cardCount: 3,
            cardPadding: 32,
            averageHeight: 0,
            itemlist: null,
            beforeTemp: 0,
            eachWidth: 0,
            itemlistTemp: [],
            scrollWidth: 0,
        }
    },
    created() {
        if (document.body.scrollHeight > window.innerHeight) this.scrollWidth = 17;
        else this.scrollWidth = 0;

        window.addEventListener('resize', this.handleTableResize);
        window.addEventListener('click', this.handleTableFilter);
        axios({
                method: 'get',
                url: '/product',
            })
            .then(response => {
                this.itemlist = response.data;
                this.itemlist.forEach(item => {
                    item.category += ',all';
                    item.pick = true;
                });
                this.itemlistTemp = [...this.itemlist];
            });
        this.responseWindow();
    },
    updated() {
        this.averageHeight = 0;
        requestAnimationFrame(this.loop);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleTableResize);
        window.removeEventListener('click', this.handleTableFilter);
    },
    methods: {
        responseWindow() {
            if (document.body.scrollHeight > window.innerHeight) this.scrollWidth = 17;
            else this.scrollWidth = 0;
            if (navigator.userAgent.match(/mobile/gim)) {
                this.scrollWidth = 0;
            }

            if (window.innerWidth - this.scrollWidth < 576) {
                this.cardCount = 1;
            } else {
                this.cardCount = 3;
            }
        },
        handleTableFilter(ev) {
            const target = ev.target;
            const type = target.dataset.type;
            if (!type) return;

            const q = document.querySelector('.card-wrap');
            const wrap = [...q.children];
            for (let item in wrap) {
                if (wrap[item].dataset.link.match(type)) {
                    this.itemlistTemp[item].pick = true;
                } else {
                    this.itemlistTemp[item].pick = false;
                }
            }

            this.itemlistTemp = [...this.itemlistTemp]; // 데이터가 새로 갱신되어야 나머지 데이터 부분에서 업데이트가 일어난다.
        },
        handleTableResize() {
            this.responseWindow();
            this.itemlistTemp = [...this.itemlistTemp];
        },
        loop() {
            const wrap = [...document.querySelector('.card-wrap').children];
            let row = Math.ceil(wrap.length / this.cardCount);
            this.eachWidth = (document.querySelector('.card-wrap').clientWidth - this.cardPadding) / this.cardCount;
            for (let item in wrap) {
                if (wrap[item].clientHeight > this.averageHeight) {
                    this.averageHeight = wrap[item].clientHeight;
                } else {
                    continue;
                }
            }
            document.querySelector('.card-wrap').style.height = this.averageHeight * row + 'px';
            if (this.beforeTemp == this.averageHeight) {
                this.setTable(wrap);
                cancelAnimationFrame(this.loop);
            } else {
                this.beforeTemp = this.averageHeight;
                requestAnimationFrame(this.loop);
            }
        },
        setTable(wrap) {
            let idx = 0;
            for (let item in wrap) {
                wrap[item].style.top = this.averageHeight * Math.floor(idx / this.cardCount) + 'px';
                wrap[item].style.left = (navigator.userAgent.match(/mobile/gim)?0:[-16,0,16][idx % this.cardCount])+(this.eachWidth * (idx % this.cardCount)) + this.cardPadding / 2 + 'px';
                if (this.itemlistTemp[item].pick) idx++;
            }
            document.querySelector('.card-wrap').style.height = this.averageHeight * Math.ceil(idx / this.cardCount)+'px';
        }
    },
    computed: {
        uppercase() {
            return (str) => {
                return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            }
        },
    },
    template: `
    <div>
        <div class="w-flex justify-content-center btn-bundle mb-5">
            <button
            class="tag tag-secondary fs-6 fs-md-4 px-md-4 py-md-2"
            v-for="item in tabs"
            :data-type="item.type"
            :key="item.id">{{uppercase(item.type)}}</button>
        </div>
        <div
        class="card-wrap"
        style="overflow: hidden;">
            <ModuleCard
            v-for="item in itemlistTemp"
            :data-link="item.category"
            :key="item.num"
            :item="item"
            :class="['card', item.pick?'':'hide', 'card-pd-3']"
            :style="'width: calc((100% - 32px) / '+ cardCount+');'"/>
        </div>
    </div>
    `
}