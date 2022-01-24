import NavWrap from './nav/NavWrap.js';

export default {
    props: ['brand', 'menulist'],
    data(){
        return {
            navClass: [
                'gnb', 'position-sticky', 'bg-primary', 'us-none'
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