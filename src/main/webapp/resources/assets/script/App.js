/**
 * jsp el을 사용못하는 이유
 * java -> jstl -> html -> javascript 순으로 jsp가
 * 실행되기 때문
 * 그리고 외부 javascript는 파싱하지 않기 때문에 외부 파일
 * 에서 사용하기는 불가
 */
'use strict';

import * as Modules from './Modules.js';

import AppNav from './components/apps/AppNav.js';
import AppMain from './components/apps/AppMain.js';
import AppMainBody from './components/apps/AppMainBody.js';
import AppFooter from './components/apps/AppFooter.js';
import AppParts from './components/apps/AppParts.js';

Vue.config.ignoredElements = [/^ion-/];

new Vue({
    el: '#app',
    data: {
        brand: 'CoffeeCong',
        itemlist: [],
        logTime: {
            h:0,
            m:0,
            s:0,
        }
    },
    created() {
        axios({
                method: 'get',
                url: '/product',
            })
            .then(response => {
                this.itemlist = response.data;
            });

        const memberInfo = sessionStorage['member']?JSON.parse(sessionStorage['member']):null;

        if(memberInfo){
            try{
                let valid = JSON.parse(memberInfo.token.unlock());
                if(valid.num){
                    axios({
                        url:'/member/'+valid.num,
                        method: 'get'
                    })
                    .then(data=>{
                        if(data.data.id != memberInfo.id || data.data.email != memberInfo.email){
                            alert('토큰이 유효하지 않습니다!');
                            sessionStorage.removeItem('member');
                            location = '/signin';
                        }
                    })
                    .catch(e=>{
                        alert('토큰이 유효하지 않습니다!');
                        sessionStorage.removeItem('member');
                        location = '/signin';
                    });
                }
            } catch(e){
                alert('토큰이 유효하지 않습니다!');
                sessionStorage.removeItem('member');
                location = '/signin';
            }
        }

        if(memberInfo&&memberInfo.expired - new Date().getTime()<0 && memberInfo.active){
            memberInfo.active = false;
            sessionStorage['member'] = JSON.stringify(memberInfo);
            if(!location.search.slice(1).match('e=')) location = '/?e=1';
        }
    },
    computed: {
        getError(){
            const params = location.search.slice(1).split('&').map(x=>new Map([x.split('=')]));
            const errorValue = params.filter(x=>x.has('e')).pop()?.get('e');
            return errorValue??0;
        }
    },
    components: {
        AppNav,
        AppMain,
        AppMainBody,
        AppFooter,
        ...AppParts,
    }
});