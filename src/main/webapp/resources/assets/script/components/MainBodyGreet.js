export default {
    data(){
        return {
            greetMessage: `CoffeeCong은 풍부한 맛과 향은 세계최고 품질의 원두와전문적 바리스타의 합작으로 탄생합니다.이제, CoffeeCong에서 진정한 커피를 즐겨보세요.`,
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
                'background-size': ((window.innerHeight-61)*(window.innerWidth-17))/200+'px',
            },
            duplStyle: {
                'width': document.body.scrollHeight>window.innerHeight-61?window.innerWidth-17+'px':window.innerWidth+'px',
                'height': window.innerHeight-61+'px',
            }
        }
    },
    created(){
        window.addEventListener('resize', (ev)=>{
            let cover = document.querySelector('[alt="cover"]');
            let wrap = document.querySelector('.cc');
            wrap.style.height = window.innerHeight-61+'px';
            wrap.style.width = document.body.scrollHeight>window.innerHeight-61?window.innerWidth-17+'px':window.innerWidth+'px';
            cover.style.height = window.innerHeight-61+'px';
            cover.style.width = document.body.scrollHeight>window.innerHeight-61?window.innerWidth-17+'px':window.innerWidth+'px';
        });

        document.body.addEventListener('scroll', (ev)=>{
            let cover = document.querySelector('[alt="cover"]');
            let body = document.querySelector("body");
            cover.style.transform = `translate3d(0px, ${body.scrollTop*0.75}px, 0px)`;
        })
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
                    <div class="btns">
                        <button class="btn btn-point">온라인 몰</button>
                        <button class="btn btn-frame-point">주문 조회</button>
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