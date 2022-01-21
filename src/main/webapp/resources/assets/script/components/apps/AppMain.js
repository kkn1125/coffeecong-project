import AppMainBody from './AppMainBody.js';

export default {
    data(){
        return {
            
        }
    },
    template: `
    <div class="main">
        <slot></slot>
    </div>
    `,
    components: {
        AppMainBody,
    }
}