export default {
    data(){
        return {
            list: [],
        }
    },
    created(){
        axios({
            method: 'get',
            url: '/product',
        })
        .then(response=> {
            this.list = response.data;
        })
        .catch(e=>console.log(e));
    },
    computed: {
        recentItem(){
            return [...this.list].sort((a,b)=>a.regdate-b.regdate).slice(-1).pop();
        }
    },
    template: `
    <section class="fence-full fence-lg">
        <ModuleItemView
        :recentItem="recentItem"
        :modules="'module-star'"/>
    </section>
    `,
}