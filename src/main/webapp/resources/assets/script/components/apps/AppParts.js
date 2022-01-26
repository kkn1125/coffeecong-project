import DetailProduct from './detail/DetailProduct.js';
import MallHead from './mall/MallHead.js';
import MallContent from './mall/MallContent.js';
import SignIn from './signin/SignIn.js';
import SignUp from './signup/SignUp.js';

const AppDetail = {
    template: `
        <main>
            <detail-product></detail-product>
        </main>
    `,
    components: {
        DetailProduct
    }
}

const AppMallSide = {
    data(){
        return {
            list: [
                {id: 0, name: 'bean'},
                {id: 1, name: 'coffee'},
                {id: 2, name: 'tea'},
                {id: 3, name: 'machine'},
                {id: 4, name: 'wear'},
            ]
        }
    },
    computed: {
        uppercase(){
            return (str)=>{
                return str.split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join('');
            }
        }
    },
    template: `
    <aside id="lsb" class="side-bar hide" data-side-bar="left">
        <div class="p-5 border flex-basis-100">
            <div class="position-static position-sticky-sm" style="top: 111.375px;">
                <div class="menu-title text-uppercase mb-5 text-muted">
                    Menu
                </div>
                <ul class="list-group">
                    <li
                    class="list-item"
                    v-for="li in list"
                    :key="li.id">
                        <a :href="'?type='+li.name">{{uppercase(li.name)}}</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </aside>
    `
}

const AppMall = {
    template: `
        <main>
            <div class="py-5"></div>
            <mall-head></mall-head>
            <div class="horizon-pad"></div>
            <mall-content></mall-content>
            <div class="horizon-pad"></div>
        </main>
    `,
    components: {
        MallHead,
        MallContent,
    }
}

const AppSignIn = {
    template: `
        <main>
            <div class="py-5"></div>
            <sign-in></sign-in>
            <div class="horizon-pad"></div>
        </main>
    `,
    components: {
        SignIn,
    }
}

const AppSignUp = {
    template: `
    <main>
        <div class="py-5"></div>
        <sign-up></sign-up>
        <div class="horizon-pad"></div>
    </main>
    `,
    components: {
        SignUp,
    }
}

const AppAbout = {
    template: `
    <div class="main">
    AppAbout
    </div>
    `
}

export default {
    AppDetail,
    AppMallSide,
    AppMall,
    AppSignUp,
    AppSignIn,
    AppAbout,
}