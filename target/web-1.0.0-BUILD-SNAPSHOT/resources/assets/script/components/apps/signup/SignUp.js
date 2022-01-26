export default {
    data() {
        return {
            showPass: false,
            lazyText: 'button',
            current: 0,
            btnStyle: ['btn', {'btn-info': true}, 'btn-lg', 'px-2', 'rounded-0'],
            payload: true,
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
                                value: '',
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
                                value: '',
                            }
                        },
                        {
                            name: 'email',
                            type: 'email',
                            options: {
                                autocomplete: 'username',
                                placeholder: 'kimson1234@naver.com',
                                value: '',
                            }
                        },
                        {
                            name: 'password',
                            type: 'password',
                            options: {
                                autocomplete: 'current-password',
                                value: '',
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
                            name: 'temp_address_main',
                            type: 'text',
                            options: {
                                placeholder: '서울시 중랑구 ...',
                                value: '',
                            }
                        },
                        {
                            name: 'address_sub',
                            type: 'text',
                            options: {
                                placeholder: '402호',
                                value: '',
                            }
                        },
                        {
                            name: 'temp_address_zip',
                            type: 'text',
                            options: {
                                placeholder: '12345',
                                value: '',
                            }
                        },
                        {
                            name: 'address_main',
                            type: 'text',
                            options: {
                                placeholder: '서울시 중랑구 ...',
                                value: '',
                                hidden: true,
                            }
                        },
                        {
                            name: 'address_zip',
                            type: 'text',
                            options: {
                                placeholder: '12345',
                                value: '',
                                hidden: true,
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
                input.addEventListener('click', this.getJuso);
            }
        })
    },
    methods: {
        getJuso(ev){
            let root = this;
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
                    const tempMain = document.querySelector('[name="temp_address_main"]');
                    const tempZip = document.querySelector('[name="temp_address_zip"]');
                    const main = document.querySelector('[name="address_main"]');
                    const zips = document.querySelector('[name="address_zip"]');
                    let juso = '';
                    let zip = data.zonecode // 우편
                    let ra = data.roadAddress // 도로명 주소
                    let ja = data.jibunAddress // 지번 주소
                    let bn = data.buildingName // 건물 명
                    if(data.userSelectedType == 'R'){
                        juso = ra + ' ' + bn;
                    } else {
                        juso = ja + ' ' + bn;
                    }
                    
                    root.signupOrder[2].input.map(x=>{
                        if(x.name.match(/main/gm)){
                            x.options.value = juso;
                        } else if(x.name.match(/zip/gm)) {
                            x.options.value = zip;
                        }
                    });

                    main.value = juso;
                    tempMain.value = juso;

                    zips.value = zip;
                    tempZip.value = zip;

                    tempMain.setAttribute('lock','');
                    tempZip.setAttribute('lock','');
                    tempMain.setAttribute('readonly','');
                    tempZip.setAttribute('readonly','');
                }
            }).open();
        },
        showError(input) {
            // input.setCustomValidity(getMessage(input.validity) || '');
            const isErrorFirst = [...input.parentNode.children].slice(-1).pop();
            const isErrorSecond = input.parentNode.nextElementSibling;
            const target = isErrorFirst.classList.contains('error')?isErrorFirst:isErrorSecond;

            if(target){
                this.lazyText = 'button';
            }

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
            const wrap = document.forms[0];

            for(let i of [...wrap].filter(x=>x.required)){
                if(i.value.trim()==''){
                    this.current = [...i.parentNode.parentNode.parentNode.children].indexOf(i.parentNode.parentNode);
                    this.goToOrder(this.current);
                    break;
                }
            }
        },
        showToggle(ev){
            this.showPass = !this.showPass;
        },
        sendForm(){
            if(this.payload){
                axios({
                    method: 'post',
                    url: '/member',
                    params: {
                        id: decodeURIComponent(document.signup.id.value),
                        email: decodeURIComponent(document.signup.email.value),
                        password: decodeURIComponent(document.signup.password.value),
                        name: decodeURIComponent(document.signup.name.value),
                        birth: decodeURIComponent(document.signup.birth.value),
                        address_main: decodeURIComponent(document.signup.address_main.value),
                        address_sub: decodeURIComponent(document.signup.address_sub.value),
                        address_zip: decodeURIComponent(document.signup.address_zip.value),
                    }
                })
                .then(response=> {
                    if(response.status==200) {
                        location.href = "/";
                    }
                })
                .catch(e=> {
                    alert('회원가입에 실패했습니다.');
                    location.reload();
                });
            } else {
                alert('아이디가 중복됩니다.');
                this.current = 1;
                this.goToOrder(this.current);
            }
        },
        checkId(payload){
            console.log(payload)
            this.payload = payload==''?true:false;
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
            <form
            name="signup"
            @submit.prevent="sendForm">
                <module-signup
                @sendCheckId="checkId"
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