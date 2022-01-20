import MallHead from './MallHead.js';
import MallContent from './MallContent.js';

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
                        <a :href="'/'+li.name">{{uppercase(li.name)}}</a>
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
    <div class="main">
    AppSignIn
    </div>
    `
}

const AppSignUp = {
    template: `
    <div class="main">
    AppSignUp
    </div>
    `
}

const AppAbout = {
    template: `
    <div class="main">
    AppAbout
    </div>
    `
}

export default {
    AppMallSide,
    AppMall,
    AppSignUp,
    AppSignIn,
    AppAbout,
}