<template>
<div class="h-full w-full flex flex-col justify-center items-center">

    <h2 @click="$router.push('/')" class="text-3xl mt-8">{{_lang('ยินดีต้อนรับเข้าสู่','Welcome to','欢迎来到')}}</h2>
    <h2 @click="$router.push('/')" class="font-semibold text-2xl text-left"> {{_lang('ตลาดควาย กรุณาเข้าสู่ระบบ','Buffalo Market Please login','布法罗市场请登录')}}</h2><br>

    <v-card class="w-full md:w-96 shadow-xl rounded-lg mb-6">
        <v-card-text>
            <form @submit.prevent="login()" class="flex flex-col p-3"> 
                <div class="w-full mb-3">
                    <v-text-field v-model="form.username" required type="text"  :label="_lang('กรุณาใส่ชื่อผู้ใช้','Please enter username','請輸入用戶名')" filled rounded></v-text-field>
                </div>
                <div class="w-full mb-3">
                    <v-text-field v-model="form.password" required type="password" :label="_lang('กรุณาใส่รหัสผ่าน','Please enter password','請輸入密碼')" filled rounded></v-text-field>
                </div> 
                <v-btn rounded large class="w-full" type="submit" color="success">{{_lang('เข้าสู่ระบบ','Login','登录')}}</v-btn>
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

<style scoped> 

</style>
