import NavBrand from './NavBrand.js';
import NavBtn from './NavBtn.js';
import NavList from './NavList.js';

export default {
    props: ['menus', 'brand'],
    template: `
    <div class="gnb-inner gnb-expand-md hide align-items-center">
        <component
        is="navBrand"
        :brand="brand"></component>
        <component
        is="navBtn"></component>
        <component
        is="navList"
        :menus="menus"></component>
    </div>
    `,
    components: {
        NavBrand,
        NavBtn,
        NavList,
    }
}