<template>
 <div class="h-full w-full flex flex-col justify-center items-center">
     <h2 @click="$router.push('/')" class="text-3xl mt-8 mb-4">{{_lang('สมัครสมาชิก','Register','寄存器')}}</h2>
     <v-card class="w-full md:w-96 rounded-lg">
         <v-card-text>
             <form @submit.prevent="register">
                 <div> 
                    <v-text-field required v-model="form.username" type="text" :label="_lang('ชื่อผู้ใช้งาน','Username','用戶名')" filled rounded></v-text-field>
                    <v-text-field required v-model="form.password" type="password" :label="_lang('รหัสผ่าน','Password','密碼')" filled rounded></v-text-field>
                    <v-text-field required v-model="form.password2" type="password" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','確認密碼')" filled rounded></v-text-field>
                    <v-text-field required v-model="form.first_name" type="text" :label="_lang('ชื่อ','Firstname','名字')" filled rounded></v-text-field>
                    <v-text-field required v-model="form.last_name" type="text" :label="_lang('นามสกุล','Lastname','姓')" filled rounded></v-text-field>
                    <v-btn rounded large class="w-full" type="submit" color="success">{{_lang('สมัครสมาชิก','Register','寄存器')}}</v-btn>
                 </div>  
             </form>
         </v-card-text>
         <v-card-actions> 
            <center>
                 <v-btn @click="$router.push('/login')" text color="primary"><span v-html="_lang('มีบัญชีอยู่แล้ว? <b>เข้าสู่ระบบ</b> ที่นี่','New member? <b> Register </b> here','新成员？ <b>在</ b>注册')"></span></v-btn>
            </center>
         </v-card-actions>
     </v-card>
     <br>
 </div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import { Core } from '../../store/core'
import { Auth } from '../../store/auth'
import { User } from '../../store/user'
@Component({
    components: {

    },
    computed: {}
})

export default class Forgot extends Vue {

    form: any = {}
    async created() {

    }

    async register() {
        let storeUser = await Core.postHttp(`api/register/`, this.form)
        if (storeUser.id) {
            alert('สมัครสมาชิกสำเร็จ');
            await this.$router.push('/login')
        } else {
            alert('สมัครสมาชิกไม่สำเร็จ');
        }
    }

}
</script>
 
<style scoped>
/* Helper classes */ 
</style>
