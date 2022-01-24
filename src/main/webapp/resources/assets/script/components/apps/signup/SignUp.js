export default {
    data() {
        return {
            showPass: false,
            lazyText: 'button',
            current: 0,
            btnStyle: ['btn', {'btn-info': true}, 'btn-lg', 'px-2', 'rounded-0'],
            validityMessage: {
                badInput: '[Warn] 잘못된 입력입니다.',
                patternMismatch: '[Warn] 패턴에 맞게 입력해주세요.',
                rangeOverflow: '[Warn] 범위를 초과했습니다.',
                rangeUnderflow: '[Warn] 범위보다 작습니다.',
                stepMismatch: '[Warn] 간격에 맞게 입력해주세요.',
                tooLong: '[Warn] 최대 글자 미만으로 입력해주세요.',
                tooShort: '[Warn] 최소 글자 이상으로 입력해주세요.',
                typeMismatch: '[Warn] 형식에 맞게 입력해주세요.',
                valueMissing: '[Warn] 해당 필드는 비워둘 수 없습니다.',
            },
            signupOrder: [
                {
                    id: 0,
                    title: '이름과 생년월일을 입력해 주세요.',
                    show: true,
                    input: [
                        {
                            name: 'name',
                            type: 'text',
                            options: {
                                placeholder: '이름을 입력해주세요',
                            }
                        }, 
                        {
                            name: 'birth',
                            type: 'date',
                            options: {
                                value: new Date().toLocaleString().split(' ').slice(0, 3).map(s=>s.replace('.','').padStart(2,0)).join('-'),
                            }
                        }, 
                    ]
                },
                {
                    id: 1,
                    title: '아이디와 패스워드를 입력해주세요',
                    show: false,
                    input: [
                        {
                            name: 'id',
                            type: 'text',
                            options: {
                                autocomplete: 'username',
                                placeholder: 'kimson1234',
                            }
                        },
                        {
                            name: 'email',
                            type: 'email',
                            options: {
                                autocomplete: 'username',
                                placeholder: 'kimson1234@naver.com',
                            }
                        },
                        {
                            name: 'password',
                            type: 'password',
                            options: {
                                autocomplete: 'current-password',
                            }
                        },
                    ]
                },
                {
                    id: 2,
                    title: '주소지를 입력해주세요',
                    show: false,
                    input: [
                        {
                            name: 'address_main',
                            type: 'text',
                            options: {
                                placeholder: '서울시 중랑구 ...'
                            }
                        },
                        {
                            name: 'address_sub',
                            type: 'text',
                            options: {
                                placeholder: '402호'
                            }
                        },
                        {
                            name: 'address_zip',
                            type: 'text',
                            options: {
                                placeholder: '12345'
                            }
                        },
                    ]
                },
            ]
        }
    },
    mounted() {
        document.querySelectorAll('input:not([type="checkbox"])').forEach(input=>{
            input.addEventListener('invalid', this.checkFormValid.bind(this, input));
            input.addEventListener('input', this.renderErrorBox.bind(this, input));
            if(input.name.match(/address_main|zip/gm)){
                input.addEventListener('click', (ev)=>{
                    if(ev.target.getAttribute('lock')==''){
                        let check = confirm('주소지를 수정하시겠습니까?');
                        if(!check){
                            return ;
                        }
                    }
                    new daum.Postcode({
                        oncomplete: function(data) {
                            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                            const main = document.querySelector('[name="address_main"]');
                            const zips = document.querySelector('[name="address_zip"]');

                            let zip = data.zonecode // 우편
                            let ra = data.roadAddress // 도로명 주소
                            let ja = data.jibunAddress // 지번 주소
                            let bn = data.buildingName // 건물 명
                            if(data.userSelectedType == 'R'){
                                main.value = ra + ' ' + bn;
                            } else {
                                main.value = ja + ' ' + bn;
                            }
                            zips.value = zip;
                            main.setAttribute('lock','');
                            zips.setAttribute('lock','');
                            main.setAttribute('readonly','');
                            zips.setAttribute('readonly','');
                        }
                    }).open();
                });
            }
        })
    },
    methods: {
        showError(input) {
            // input.setCustomValidity(getMessage(input.validity) || '');
            const isErrorFirst = [...input.parentNode.children].slice(-1).pop();
            const isErrorSecond = input.parentNode.nextElementSibling;
            const target = isErrorFirst.classList.contains('error')?isErrorFirst:isErrorSecond;
            const parent = target.parentNode;
            const idx = [...parent.parentNode.children].indexOf(parent);

            let min = 0;

            if(target){
                this.lazyText = 'button';
            }

            this.current = min<idx?min:idx;
            this.goToOrder(min);
            target.textContent = this.getMessage(input.validity) || '';
        },
        getMessage(validity){
            for(const key in this.validityMessage) {
                if(validity[key]) {
                    return this.validityMessage[key];
                }
            }
        },
        renderErrorBox(input, ev){
            ev.preventDefault();
            this.showError(input);
        },
        checkFormValid(input, ev){
            ev.preventDefault();
            document.forms[0].classList.add('was-validated');
            this.showError(input);
        },
        goToOrder(num) {
            this.resetOrder();
            this.signupOrder[num].show = true;
        },
        prevOrder(ev) {
            this.current>0?this.current -= 1:this.current;
            this.resetOrder();
            this.signupOrder[this.current].show = true;
        },
        nextOrder(ev) {
            this.current<this.signupOrder.length-1?this.current += 1:this.current;
            this.resetOrder();
            this.signupOrder[this.current].show = true;
        },
        resetOrder() {
            this.signupOrder.forEach(sign=>sign.show=false);
        },
        checkForm(ev){
            this.lazyText = 'submit';
            console.log(document.forms[0])
        },
        showToggle(ev){
            this.showPass = !this.showPass;
        }
    },
    computed: {
        isLast(){
            if(this.current == this.signupOrder.length-1){
                this.btnStyle[1]['btn-info'] = false;
                this.btnStyle[1]['btn-danger'] = true;
                return true;
            } else {
                this.btnStyle[1]['btn-info'] = true;
                this.btnStyle[1]['btn-danger'] = false;
                return false;
            }
        },
        lazySubmit(){
            return this.lazyText;
        }
    },
    template: `
        <section class="fence-full fence-lg">
            <module-breadcrumb
            :current="current"
            :orders="signupOrder"></module-breadcrumb>
            <form @submit.prevent="checkFormValid">
                <module-signup
                @visible="showToggle"
                :orders="signupOrder"
                :showPass="showPass"></module-signup>
                <div class="text-center">
                    <button
                    type="button"
                    @click="prevOrder"
                    :class="btnStyle">prev</button>
                    <button
                    type="button"
                    v-if="!isLast"
                    @click="nextOrder"
                    :class="btnStyle">next</button>
                    <button
                    :type="lazySubmit"
                    v-else
                    @click="checkForm"
                    :class="btnStyle">가입하기</button>
                </div>
            </form>
        </section>
    `
}