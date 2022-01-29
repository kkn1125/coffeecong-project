export default{
    data(){
        return {
            member: null,
            saveMode: false,
            values: {},
            showPass: false,
            id: '',
            email: '',
            loginBadge: ['rounded-circle', 'w-flex', 'justify-content-center', 'fs-3', 'align-items-center'],
            convertWay: true,
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
            }
        }
    },
    mounted() {
        document.querySelectorAll('input:not([type="checkbox"])').forEach(input=>{
            input.addEventListener('invalid', this.checkForm.bind(this, input))
            input.addEventListener('input', this.renderErrorBox.bind(this, input))
        });

        const memberInfo = sessionStorage['member']?JSON.parse(sessionStorage['member']):null;
        let validInfo = null;

        this.saveMode = memberInfo?.save??false;
        if(memberInfo?.save){
            this.id = memberInfo.id;
            this.email = memberInfo.email;
            try{
                validInfo = JSON.parse(memberInfo.token.unlock());
            } catch(e){
                console.error(e.message);
            }
            if(validInfo){
                if(validInfo.id == memberInfo.id){
                    axios({
                        method: 'get',
                        url: '/member/id/'+validInfo.id,
                    })
                    .then(response=>document.login.password.value = response.data.password)
                    .catch(e=>console.log(e))
                }
            }
        }
    },
    beforeDestroy() {
        document.querySelectorAll('input:not([type="checkbox"])').forEach(input=>{
            input.removeEventListener('invalid', this.checkForm.bind(this, input));
            input.removeEventListener('input', this.renderErrorBox.bind(this, input));
        });
    },
    computed: {
        getError(){
            if(location.search=='') return false;
            const params = location.search.slice(1).split('&').map(x=>new Map([x.split('=')]));
            const errorValue = params.filter(x=>x.has('e')).pop()?.get('e');
            if(errorValue){
                return true;
            }
            return false;
        }
    },
    methods: {
        showError(input) {
            // input.setCustomValidity(getMessage(input.validity) || '');
            const isErrorFirst = [...input.parentNode.children].slice(-1).pop();
            const isErrorSecond = input.parentNode.nextElementSibling;
            const target = isErrorFirst.classList.contains('error')?isErrorFirst:isErrorSecond;
            target.textContent = this.getMessage(input.validity) || '';
        },
        getMessage(validity){
            for(const key in this.validityMessage) {
                if(validity[key]) {
                    return this.validityMessage[key];
                }
            }
        },
        checkForm(input, ev){
            ev.preventDefault();
            document.forms[0].classList.add('was-validated');
            this.showError(input);
        },
        renderErrorBox(input, ev){
            ev.preventDefault();
            this.showError(input);
        },
        getValue(v){
            // console.log('받은 값:'+v)
            this.values[v[0]] = v[1];
        },
        saveInfo(ev){
            this.saveMode = ev.target.checked;
            // console.log(this.saveMode)
        },
        validateForm(ev){ // 분기문 해서 saveMode가 켜져있으면 로컬 저장 암호화, 아니면 로그인
            // console.log(ev);
            // console.log(this.saveMode);
            const form = ev.target;
            const id = form.id?.value;
            const email = form.email?.value;
            const password = form.password?.value;
            let validInfo = null;
            let validType = null;
            form.action = '/signin';
            form.method = 'post';

            if(this.convertWay){
                validInfo = id;
                validType = 'id';
            } else if(email){
                validInfo = email;
                validType = 'email';
            }

            axios({
                method: 'get',
                url: `/member/${validType}/${validInfo}`
            })
            .then(response=>{
                if(response.status == 200){
                    const data = response.data;
                    if(data.password == password){
                        sessionStorage['member'] = JSON.stringify({
                            id: data.id,
                            email: data.email,
                            token: JSON.stringify(response.data).lock(),
                            expired: new Date().getTime() + (1000*60*60*1),
                            save: this.saveMode,
                            active: true,
                        })
                        form.submit();
                    } else {
                        location = '/signin?e=1'
                    }
                }
            })
            .catch(e=> location = '/signin?e=1');
        },
        redirection(href){
            location.href = href;
        }
    },
    template: `
        <section class="fence-full fence-lg">
            <div
            class="w-flex flex-column col-md-8 col-18 align-items-center mx-auto">
                <div>
                    <span class="h3">Welcome!</span>
                </div>
                <form
                name="login"
                @submit.prevent="validateForm"
                class="w-flex flex-column align-items-start hgap-3 w-100 mt-5">
                    <component
                    @sendV="getValue"
                    @inputId="id = $event"
                    @inputEmail="email = $event"
                    :id="id"
                    :email="email"
                    :is="convertWay?
                    'ModuleInputId':'ModuleInputEmail'"></component>
                    <div class="error"></div>

                    <ModuleInputPassword
                    :showPass="showPass"/>
                    <div class="error"></div>
                    <div class="notice notice-danger" v-if="getError">
                        아이디나 비밀번호가 틀립니다. 다시 로그인 해주세요.
                    </div>
                    <span>
                        <input
                        @click="showPass=!showPass"
                        type="checkbox"
                        id="show"><label for="show">비밀번호 {{showPass?'숨기기':'보기'}}</label>
                    </span>
                    <span>
                        <input
                        @click="saveInfo"
                        :checked="saveMode"
                        type="checkbox"
                        id="save"><label for="save">로그인 정보 저장</label>
                    </span>
                    <span
                    @click="convertWay = !convertWay"
                    class="text-muted"
                    style="cursor: pointer;">
                        <ion-icon class="fs-6" name="swap-horizontal-outline"></ion-icon><span class="ps-2 fs-7">{{convertWay?'Email':'Id'}}로 로그인</span>
                    </span>
                    <div class="w-flex justify-content-around w-100">
                        <span
                        :class="[loginBadge, 'text-success']"
                        style="width: 32px; height: 32px; cursor: pointer;">
                            <span
                            style="line-height:1; -webkit-text-stroke-width: 2px;">N</span>
                        </span>
                        <span
                        :class="[loginBadge, 'text-danger']"
                        style="width: 32px; height: 32px; cursor: pointer;">
                            <ion-icon name="logo-google"></ion-icon>
                        </span>
                        <span
                        :class="[loginBadge, 'text-info']"
                        style="width: 32px; height: 32px; cursor: pointer;">
                            <ion-icon name="logo-facebook"></ion-icon>
                        </span>
                    </div>
                    <button
                    class="btn btn-info btn-lg w-100"
                    role="button">로그인</button>
                    <button
                    @click="redirection('/signup')"
                    type="button"
                    class="btn btn-success btn-lg w-100">회원가입</button>
                </form>
            </div>
        </section>
    `
}