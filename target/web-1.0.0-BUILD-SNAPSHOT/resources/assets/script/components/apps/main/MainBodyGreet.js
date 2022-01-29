export default {
    data(){
        return {
            scrollWidth: (()=>navigator.userAgent.match(/mobile/gim)?0:17)(),
            greetMessage: `CoffeeCong의 풍부한 맛과 향은 최상 품질의 원두와 커피 전문가의 노력으로 탄생합니다. CoffeeCong에서 진정한 커피의 맛과 향을 즐겨보세요.`,
            coverStyle: {
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'overflow': 'hidden',
                'pointer-events': 'none',
                'transform-style': 'preserve-3d',
                'backface-visibility': 'hidden',
                'background-attachment': 'fixed',
                'object-position': 'center',
                'object-fit': 'cover',
                'background-size': ((window.innerHeight-61)*(window.innerWidth-(()=>navigator.userAgent.match(/mobile/gim)?0:17)()))/200+'px',
            },
            duplStyle: {
                'width': document.body.scrollHeight>window.innerHeight-61?window.innerWidth-(()=>navigator.userAgent.match(/mobile/gim)?0:17)()+'px':window.innerWidth+'px',
                'height': window.innerHeight-61+'px',
            }
        }
    },
    created(){
        window.addEventListener('resize', this.handleResize);
        document.body.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleResize(ev){
            let isMobile = null;
            setTimeout(()=>{
                isMobile = navigator.userAgent.match(/mobile/gim)?0:17;
            })
            let cover = document.querySelector('[alt="cover"]');
            let wrap = document.querySelector('.cc');
            wrap.style.height = window.innerHeight-61+'px';
            wrap.style.width = document.body.scrollHeight>window.innerHeight-61?window.innerWidth-isMobile+'px':window.innerWidth+'px';
            cover.style.height = window.innerHeight-61+'px';
            cover.style.width = document.body.scrollHeight>window.innerHeight-61?window.innerWidth-isMobile+'px':window.innerWidth+'px';
        },
        handleScroll(ev){
            let cover = document.querySelector('[alt="cover"]');
            let body = document.querySelector("body");
            cover.style.transform = `translate3d(0px, ${body.scrollTop*0.75}px, 0px)`;
        }
    },
    template: `
    <section class="cc" :style="duplStyle">
        <div class="cc-background">
            <div class="cc-background-overlay">
            </div>
        </div>
        <div class="cc-foreground">
            <div class="cc-forestring">
                <div class="greeting">
                    <div class="greeting-content">
                        {{greetMessage}}
                    </div>
                    <div class="greeting-title">
                        CoffeeCong is defference.
                    </div>
                    <div class="w-flex vgap-3">
                        <button class="btn btn-point rounded-0 px-4 py-2" @click="this.location='/mall'">온라인 몰</button>
                        <button class="btn btn-frame-point rounded-0 px-4 py-2">주문 조회</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cc-cover position-absolute top-0 start-0">
            <img
            src="/resources/assets/images/main_1.jpg"
            :style="[coverStyle, duplStyle]"
            alt="cover">
        </div>
    </section>
    `
}