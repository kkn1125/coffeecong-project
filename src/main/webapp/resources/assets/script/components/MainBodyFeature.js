export default {
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
        window.addEventListener('mousedown', (ev)=>{
            const target = ev.target;
            if(!target.closest('.img-slide')) return;

            this.first = ev.clientX;
            this.originWidth = target.closest('.img-slide').scrollLeft;
            this.click = true;
        });
        window.addEventListener('mouseup', (ev)=>{
            this.click = false;
            this.autoSliding = false;
        });
        window.addEventListener('mousemove', (ev)=>{
            if(this.click){
                const target = document.querySelector('.img-slide');
                target.scrollTo(this.originWidth-(ev.clientX-this.first), target.scrollHeight);
                if(this.dragBefore<target.scrollLeft) this.direction = true; // right
                else this.direction = false; // left
                this.dragBefore = target.scrollLeft;
            }
        });
    },
    methods: {
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
    template: `
    <section class="fence-full fence-lg">
        <div>
            <span class="h5">MD's PICK</span>
        </div>
        <div class="img-slide-wrap">
            <div
            @mousedown="prevMove"
            class="arrow-left h2">
                <ion-icon name="caret-back-outline"></ion-icon>
            </div>
            <div class="img-slide mx-5">
                <div class="img-item" v-for="i in 5">
                    <div class="info-box">
                        <module-star :isSolid="true"></module-star>
                        <module-heart></module-heart>
                    </div>
                    <img src="https://dummyimage.com/250x250/aaa/fff" alt="sample">
                </div>
            </div>
            <div
            @mousedown="nextMove"
            class="arrow-right h2">
                <ion-icon name="caret-forward-outline"></ion-icon>
            </div>
        </div>
    </section>
    `
}