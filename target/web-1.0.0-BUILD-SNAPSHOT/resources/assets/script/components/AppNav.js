import NavWrap from './NavWrap.js';

export default {
    props: ['brand'],
    data(){
        return {
            navClass: [
                'gnb', 'position-sticky', 'bg-primary', 'us-none'
            ],
            menulist: [
                'home', 'mall', 'sign-in', 'sign-up', 'about'
            ],
        }
    },
    template: `
        <nav :class="navClass">
            <component
            is="navWrap"
            :brand="brand"
            :menus="menulist"></component>
        </nav>
    `,
    components: {
        NavWrap,
    }
}