<template>
 <div class="h-full w-full flex flex-col justify-center items-center pt-10 pb-10 md:pb-0 md:pt-0 bg-gray-100"> 
     <v-card class="m-8 md:w-96 rounded-lg" >
        <v-card-title class="bgbtn">
            <h2 @click="$router.push('/')" class=" text-white">{{_lang('สมัครสมาชิก','Register','寄存器')}}</h2>
        </v-card-title>
        <v-divider></v-divider>
         <v-card-text>
             <form @submit.prevent="prePareRegister">
                 <div> 
                    <v-text-field hint="แนะนำให้ใส่ 'ชื่อผู้ใช้งาน' เป็นภาษาอังกฤษ" required v-model="form.username" type="text" :label="_lang('ชื่อผู้ใช้งาน','Username','用戶名')" filled rounded prepend-inner-icon="mdi-account-circle-outline"></v-text-field>
                    <v-text-field hint="รหัสผ่านต้องไม่ซ้ำกับผู้ใช้งาน" required v-model="form.password" type="password" :label="_lang('รหัสผ่าน','Password','密碼')" filled rounded prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
                    <v-text-field required v-model="form.password2" type="password" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','確認密碼')" filled rounded prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
                    <v-text-field required v-model="form.first_name" type="text" :label="_lang('ชื่อ','Firstname','名字')" filled rounded prepend-inner-icon="mdi-badge-account-outline"></v-text-field>
                    <v-text-field required v-model="form.last_name" type="text" :label="_lang('นามสกุล','Lastname','姓')" filled rounded prepend-inner-icon="mdi-badge-account-outline"></v-text-field>
                    <v-btn rounded large class="w-full bgbtn" type="submit" color="success">{{_lang('สมัครสมาชิก','Register','寄存器')}}</v-btn>
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

     <v-dialog
         v-model="dialog"
         scrollable   
         persistent :overlay="false"
         max-width="500px"
         transition="dialog-transition"
     >
         <v-card>
             <v-card-title primary-title>
                {{_lang('ข้อกำหนดเงื่อนไขการใช้บริการ','Terms of Service','服務條款')}}
             </v-card-title>
             <v-card-text>
                  <p class="text-base text-gray-500" v-html="_lang(service.name,service.name_en,service.name_ch)"></p>
             </v-card-text>
             <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn @click="dialog = false" outlined color="red">{{_lang('ไม่ยอมรับ','Not accept','不接受')}}</v-btn>
                 <v-btn @click="register" color="success">{{_lang('ยอมรับ','Accept','接受')}}</v-btn>
             </v-card-actions>
         </v-card>
     </v-dialog>
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
import { App } from "@/store/app";
@Component({
    components: {

    },
    computed: {}
})

export default class Forgot extends Vue {

    form: any = {}
    dialog:boolean = false
    service:any = {}
    async created() {
        await this.getTermService()
    }

    async prePareRegister(){
        this.dialog = true;
    }

    async register() {
        let storeUser = await Core.postHttp(`api/register/`, this.form)
        if (storeUser.id) {
            await App.success("สมัครสมาชิกสำเร็จ")
            await this.$router.push('/login')
        } else {
            await App.error('ไม่สามารถสมัครสมาชิกได้');
        }
    }

    async getTermService(){
        let service = await Core.getHttp(`/api/default/termservice/`)
        this.service = service[service.length-1]
    }


    async closeDialog(){

    }

}
</script>
 
<style scoped>
.bgbtn{
    background-color: #cf4a1e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23f0b030'/%3E%3Cstop offset='1' stop-color='%23cf4a1e'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23e07d27'/%3E%3Cstop offset='1' stop-color='%23cf4a1e'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

</style>
