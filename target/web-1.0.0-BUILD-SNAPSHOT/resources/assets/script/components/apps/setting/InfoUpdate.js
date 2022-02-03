export default {
    data(){
        return {
            member: null,
        }
    },
    created() {
        if(sessionStorage.getItem('member')){
            axios({
                url: `/member/id/${JSON.parse(sessionStorage['member']).id}`,
                method: 'get'
            }).then(data=>this.member = data.data)
            .catch(e=>console.log(e.message));
        }
    },
    mounted() {
        [...document['info-update']].forEach(el=>{
            if(el.name.match(/address_main|zip/gm)){
                el.addEventListener('click', this.getJuso);
            }
        });
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

                    root.member.address_main = juso;
                    root.member.address_zip = zip;
                }
            }).open();
        },
        updateUserInfo(ev){
            let form = ev.target;

            axios({
                url: `/member/${this.member.num}`,
                method: 'get'
            }).then(data=>{
                if(data.status == 200){
                    console.log(data.data.password, form.password.value)
                    if(data.data.password == form.password.value){
                        axios({
                            url: `/member/${this.member.num}`,
                            method: 'put',
                            params: {
                                _method: 'put',
                                address_main: form.address_main.value,
                                address_sub: form.address_sub.value,
                                address_zip: form.address_zip.value,
                            }
                        }).then(data=>{
                            if(data.ok){
                                location = document.referrer;
                            }
                        })
                    } else {
                        console.error('비밀번호가 틀립니다.')
                        return false;
                    }
                }
            }).catch(e=>{
                console.error('[Error] 회원정보를 찾을 수 없습니다.');
            })
        },
    },
    computed: {
        getMember(){
            return this.member??false;
        }
    },
    template: `
        <section class="fence-full fence-lg">
            <div class="horizon-pad"></div>
            <form
            @submit.prevent="updateUserInfo"
            class="fence"
            name="info-update">
                <label>
                    <span>{{Object.toCapitalize('password')}}</span>
                    <input
                    required
                    class="form-input"
                    name="password"
                    type="text">
                </label>
                <label>
                    <span>{{Object.toCapitalize('address main')}}</span>
                    <input
                    required
                    class="form-input"
                    name="address_main"
                    type="text"
                    v-model="getMember.address_main">
                </label>
                <label>
                    <span>{{Object.toCapitalize('address sub')}}</span>
                    <input
                    required
                    class="form-input"
                    name="address_sub"
                    type="text"
                    v-model="getMember.address_sub">
                </label>
                <label>
                    <span>{{Object.toCapitalize('address zip')}}</span>
                    <input
                    required
                    class="form-input"
                    name="address_zip"
                    type="text"
                    v-model="getMember.address_zip">
                </label>
                <button
                class="btn btn-info"
                role="button">수정</button>
            </form>
            <div class="horizon-pad"></div>
        </section>
    `
}