export default {
    props: ['itemlist'],
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
    <section class="fence-full fence-lg">
        <div>
            <span class="h5">MD's PICK</span>
        </div>
        <div class="img-slide-wrap">
            <div
            @mousedown="prevMove"
            class="arrow-left h2 text-muted">
                <ion-icon name="caret-back-outline"></ion-icon>
            </div>
            <div class="img-slide mx-5">
                <div
                style="flex-shrink: 0;"
                class="img-item"
                v-for="item in limitItemList">
                    <div class="info-box">
                        <module-star :isSolid="true"></module-star>
                        <module-heart></module-heart>
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
    </section>
    `
}

// lorem picsum 교체하기