export default {
    data(){
        return {
            product: null,
            pnum: 0,
        }
    },
    created() {
        const num = location.href.split('/').pop();
        axios({
            method: 'get',
            url: `/product/${num}`
        })
        .then(response=>{
            this.product = response.data;
            this.pnum = this.product.num;
        })
        .catch(e=>console.log(e));
    },
    template: `
        <section class="fence-full fence-lg">
            <div class="horizon-pad"></div>
            <OrderView
            :item="product"/>
            <ModuleReview
            :num="pnum"/>
            <div class="horizon-pad"></div>
        </section>
    `
}