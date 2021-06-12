<template>
<div class="h-full w-full flex flex-col justify-center items-center bg2  pt-20 pb-20 md:pb-0 md:pt-0" >
    <h2 class="text-3xl">{{_lang('ลืมรหัสผ่าน','Forgot password','忘記密碼')}}</h2>
    <v-card class="w-full md:w-96 rounded-lg">
        <v-card-text>
            <form v-if="step==1" @submit.prevent="foundUser()">
                <div > 
                    <v-text-field v-model="form.personal_id" required type="text" :label="_lang('กรอกเลขบัตรประจำตัวประชาชน','ID card number','身份證號碼')" filled rounded></v-text-field>
                    <v-text-field v-model="form.tel" required type="text" :label="_lang('กรอกเบอร์โทร','Phone number','電話號碼')" filled rounded></v-text-field>
                </div> 
                <v-btn rounded large class="w-full" type="submit" color="success">{{_lang('ยืนยัน','Confirm','確認')}}</v-btn>
            </form>

            <form v-if="step==2" @submit.prevent="changePassword()">
                <div>
                    <v-text-field required v-model="formPassword.password" type="password" :label="_lang('รหัสผ่าน','Password','密码')" filled rounded></v-text-field>
                    <v-text-field required v-model="formPassword.password2" type="password" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')" filled rounded></v-text-field>
                </div>
                <v-btn rounded large class="w-full" type="submit" color="success">{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}</v-btn>
            </form>
        </v-card-text> 
    </v-card>

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

    step: any = 1;
    form: any = {}
    formPassword: any = {}
    user: any = null
    async created() {

    }

    async foundUser() {
        let user = await Core.getHttp(`/api/default/profile/?personal_id=${this.form.personal_id}&tel=${this.form.tel}`)
        if (user[0].id) {
            this.step = 2
            this.user = user;
        }
    }

    async changePassword(event: any) {
        let user = this.user[0];
        if (this.formPassword.password == this.formPassword.password2) {
            let change = await Core.putHttp(`/api/user/password/${user.user}/`, this.formPassword)
            this.formPassword = {}
            if (change.id) {
                alert('เปลี่ยนรหัสผ่านสำเร็จ');
                await this.$router.go(-1)
                // await App.success("เปลี่ยนรหัสผ่านสำเร็จ")
            }
        } else {
            alert('รหัสผ่านไม่ตรงกัน');
            // await App.error("รหัสผ่านไม่ตรงกัน")
        }
    }
}
</script>
 <style scoped>
/* Helper classes */ 
.bg2 {
    /* background-color:#f2f2f2" */
    background-color: #F5F5F5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover; 
}
 
</style>
