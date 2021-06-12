<template>
 <div class="h-full w-full flex flex-col justify-center items-center bg2">
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
.bg2 {
    /* background-color:#f2f2f2" */
    background-color: #F5F5F5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='400 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

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
