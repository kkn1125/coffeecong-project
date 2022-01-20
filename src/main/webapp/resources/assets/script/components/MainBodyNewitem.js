export default {
    data(){
        return {
            
        }
    },
    template: `
    <section class="fence-full fence-lg">
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
                    <span class="text-warning">
                        <span v-for="i in 5">
                            <ion-icon name="star"></ion-icon>
                        </span>
                    </span>
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
    </section>
    `,
    components: {
        
    }
}