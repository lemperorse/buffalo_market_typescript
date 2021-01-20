<template>
<div class="h-full w-full flex flex-col justify-center items-center " style="background-color:#f2f2f2">
 
    <h2 @click="$router.push('/')" class="text-3xl mt-8">{{_lang('ยินดีต้อนรับเข้าสู่','Welcome to','欢迎来到')}}</h2>
    <h2 @click="$router.push('/')" class="font-semibold text-2xl text-left"> {{_lang('ตลาดควาย กรุณาเข้าสู่ระบบ','Buffalo Market Please login','布法罗市场请登录')}}</h2><br>
   
    <v-card class="w-full md:w-96">
        <v-card-text>
            <form @submit.prevent="login()" class="flex flex-col p-3">
                <!-- <v-text-field v-model="form.username" outlined :label="_lang('ชื่อผู้ใช้','Username','用户名')"></v-text-field> -->
                <!-- <v-text-field type="password" v-model="form.password" outlined :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field> -->
                <!-- <v-btn type="submit" x-large color="success">{{_lang('เข้าสู่ระบบ','Login','登录')}}</v-btn> -->
                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ชื่อผู้ใช้','Username','用户名')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-user text-lg text-gray-500"></i>
                        </span>
                        <input v-model="form.username" required type="text" :placeholder="_lang('กรุณาใส่ชื่อผู้ใช้','Please enter username','請輸入用戶名')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('รหัสผ่าน','Password','密碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input v-model="form.password" required type="password" :placeholder="_lang('กรุณาใส่รหัสผ่าน','Please enter password','請輸入密碼')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <button type="submit" class="w-full rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
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
    </v-card> 
 
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
 