import AppMainBody from './AppMainBody.js';

export default {
    data(){
        return {
            
        }
    },
    template: `
    <div class="main">
        <component is="app-main-body"></component>
    </div>
    `,
    components: {
        AppMainBody,
    }
}