<template>
 <div class="h-full w-full flex flex-col justify-center items-center pt-10 pb-10 md:pb-0 md:pt-0 bg-gray-100"> 
     <v-card class="m-8 md:w-96 rounded-lg" >
        <v-card-title class="bgbtn">
            <h2 @click="$router.push('/')" class=" text-white">{{_lang('สมัครสมาชิก','Register','寄存器')}}</h2>
        </v-card-title>
        <v-divider></v-divider>
         <v-card-text>
             <form @submit.prevent="register">
                 <div> 
                    <v-text-field required v-model="form.username" type="text" :label="_lang('ชื่อผู้ใช้งาน','Username','用戶名')" filled rounded prepend-inner-icon="mdi-account-circle-outline"></v-text-field>
                    <v-text-field required v-model="form.password" type="password" :label="_lang('รหัสผ่าน','Password','密碼')" filled rounded prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
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
.bgbtn{
        background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

</style>
