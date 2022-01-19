import MenuWrap from './MenuWrap.js';

export default {
    props: ['brand'],
    data(){
        return {
            navClass: [
                'gnb', 'position-sticky', 'bg-primary', 'us-none'
            ],
            menulist: [
                'home', 'mall', 'sign-in', 'sign-up'
            ],
        }
    },
    template: `
        <nav :class="navClass">
            <component
            is="menuWrap"
            :brand="brand"
            :menus="menulist"></component>
        </nav>
    `,
    components: {
        MenuWrap,
    }
}