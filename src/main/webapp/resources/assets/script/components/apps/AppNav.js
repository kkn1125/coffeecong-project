import NavWrap from './nav/NavWrap.js';

export default {
    props: ['brand'],
    data(){
        return {
            navClass: [
                'gnb', 'position-sticky', 'bg-primary', 'us-none'
            ],
        }
    },
    template: `
        <nav :class="navClass">
            <NavWrap
            :brand="brand"/>
        </nav>
    `,
    components: {
        NavWrap,
    }
}