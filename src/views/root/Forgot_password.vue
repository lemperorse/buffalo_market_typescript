<template>
<div class="h-full w-full flex flex-col justify-center items-center  pt-20 pb-20 md:pb-0 md:pt-0" >
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
</style>
