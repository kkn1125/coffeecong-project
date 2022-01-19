import MenuBrand from './MenuBrand.js';
import MenuBtn from './MenuBtn.js';
import MenuList from './MenuList.js';

export default {
    props: ['menus', 'brand'],
    template: `
    <div class="gnb-inner gnb-expand-md hide align-items-center">
        <component
        is="menuBrand"
        :brand="brand"></component>
        <component
        is="menuBtn"></component>
        <component
        is="menuList"
        :menus="menus"></component>
    </div>
    `,
    components: {
        MenuBrand,
        MenuBtn,
        MenuList,
    }
}