<template>
<div class="h-full w-full flex flex-col justify-center items-center bg2">

    <h2 @click="$router.push('/')" class="text-3xl mt-8">{{_lang('ยินดีต้อนรับเข้าสู่','Welcome to','欢迎来到')}}</h2>
    <h2 @click="$router.push('/')" class="font-semibold text-2xl text-left"> {{_lang('ตลาดควาย กรุณาเข้าสู่ระบบ','Buffalo Market Please login','布法罗市场请登录')}}</h2><br>

    <div class="w-full md:w-96 shadow-xl rounded bg-white ">
        <v-card-text>
            <form @submit.prevent="login()" class="flex flex-col p-3">
                <!-- <v-text-field v-model="form.username" outlined :label="_lang('ชื่อผู้ใช้','Username','用户名')"></v-text-field> -->
                <!-- <v-text-field type="password" v-model="form.password" outlined :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field> -->
                <!-- <v-btn type="submit" x-large color="success">{{_lang('เข้าสู่ระบบ','Login','登录')}}</v-btn> -->
                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ชื่อผู้ใช้','Username','用户名')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-100 border ">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-user text-lg text-gray-500"></i>
                        </span>
                        <input v-model="form.username" required type="text" :placeholder="_lang('กรุณาใส่ชื่อผู้ใช้','Please enter username','請輸入用戶名')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('รหัสผ่าน','Password','密碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-100 border">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input v-model="form.password" required type="password" :placeholder="_lang('กรุณาใส่รหัสผ่าน','Please enter password','請輸入密碼')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>
                <button type="submit" class="w-full btn green1">
                    <div class="text-white">{{_lang('เข้าสู่ระบบ','Login','登录')}}</div>
                </button>

            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex flex-col md:flex-row ">
                <v-btn @click="$router.push('/forgot')" text color="orange">{{_lang('ลืมรหัสผ่าน','forgot password','忘记密码')}}</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/register')" text color="primary"><span v-html="_lang('สมาชิกใหม่? <b>ลงทะเบียน</b> ที่นี่','New member? <b> Register </b> here','新成员？ <b>在</ b>注册')"></span></v-btn>
            </div>
        </v-card-actions>
    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import WebNav from '../../components/core/WebNav.vue'
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
@Component({
    components: {
        WebNav
    },
    computed: {}
})

export default class Login extends Vue {
    form: any = {}
    async created() {
        await Auth.checkToken();
        if (Auth.logined) {
            await this.$router.replace('/')
        }
    }
    async login() {
        await Auth.reToken();
        let logined = await Core.postHttp(`/api/auth/login/`, this.form)
        if (logined.key) {
            await Auth.storeToken(logined.key)
            await Auth.storeTokenToStorage(logined.key)
            await this.$router.push('/')
            await location.reload();
        }
    }
}
</script> 

<style scoped>
/* Helper classes */
.bg2 {
    background-color: #F5F5F5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-300 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

/* start da css for da buttons */
.btn {
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 22px;
    text-decoration: none;
    color: #fff;
    position: relative;
    display: inline-block;
}

.btn:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
}

.green1 {
    background-color: #0EAD69;
    box-shadow: 0px 5px 0px 0px #283D3B;
}

.green1:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
}
</style>
