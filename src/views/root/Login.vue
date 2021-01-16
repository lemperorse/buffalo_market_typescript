<template>
<div class="h-full w-full flex flex-col justify-center items-center" style="background-color:#f2f2f2">
    <h2 @click="$router.push('/')"  class="text-3xl">{{_lang('ยินดีต้อนรับเข้าสู่','Welcome to','欢迎来到')}}</h2>
    <h2 @click="$router.push('/')" class="font-semibold text-2xl text-left"> {{_lang('ตลาดควาย กรุณาเข้าสู่ระบบ','Buffalo Market Please login','布法罗市场请登录')}}</h2><br>
    <v-card class="w-full md:w-96">
        <v-card-text >
            <form @submit.prevent="login()" class="flex flex-col p-3">
                <v-text-field v-model="form.username"  outlined :label="_lang('ชื่อผู้ใช้','Username','用户名')"  ></v-text-field>
                  <v-text-field type="password" v-model="form.password"   outlined :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field>
                  <v-btn type="submit" x-large color="success">{{_lang('เข้าสู่ระบบ','Login','登录')}}</v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex flex-col md:flex-row ">
                <v-btn @click="$router.push('/forgot')" text color="orange">{{_lang('ลืมรหัสผ่าน','forgot password','忘记密码')}}</v-btn> <v-spacer></v-spacer> 
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
import {Core} from '../../store/core'
import {Auth} from '../../store/auth'
@Component({
    components: {
        WebNav
    },
    computed: {}
})

export default class Login extends Vue {
    form:any = {}
        async created() {  
        await Auth.checkToken(); 
        if(Auth.logined){
           await this.$router.replace('/')
        }
    }
    async login(){
        await Auth.reToken();
        let logined = await Core.postHttp(`/api/auth/login/`,this.form)
        if(logined.key){
            await Auth.storeToken(logined.key)
            await Auth.storeTokenToStorage(logined.key)
            await this.$router.push('/')
            await location.reload();
        }
    }
}
</script>
