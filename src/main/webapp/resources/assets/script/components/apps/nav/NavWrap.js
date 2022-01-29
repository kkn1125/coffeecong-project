import NavBrand from './NavBrand.js';
import NavBtn from './NavBtn.js';
import NavList from './NavList.js';

export default {
    props: ['brand'],
    template: `
    <div class="gnb-inner gnb-expand-md hide align-items-center">
        <NavBrand
        :brand="brand"/>
        <NavBtn
        is="navBtn"/>
        <NavList
        is="navList"/>
    </div>
    `,
    components: {
        NavBrand,
        NavBtn,
        NavList,
    }
}