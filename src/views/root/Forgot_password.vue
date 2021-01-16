<template>
<div>
    <button @click="$router.go(-1)" class="p-3 text-red-600">
        <i class="fas fa-arrow-circle-left text-3xl"></i>
    </button>

    <div class="   p-4 ">
        <h2 class="text-2xl">ลืมรหัสผ่าน</h2>
        <form v-if="step==1" @submit.prevent="foundUser()">
            <v-text-field v-model="form.personal_id" filled label="ระบุเลขบัตรประจำตัวประชาชน"></v-text-field>
            <v-text-field v-model="form.tel" filled label="เบอร์โทร"></v-text-field>
            <v-btn type="submit" class="w-full" color="success">ยืนยัน</v-btn>
        </form>

        <form v-if="step==2" @submit.prevent="changePassword()">
            <div class="flex flex-wrap">
                <v-text-field type="password" required prepend-inner-icon="mdi-lock" class="w-full " v-model="formPassword.password" filled :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field>
                <v-text-field type="password" required prepend-inner-icon="mdi-lock" class="w-full " filled v-model="formPassword.password2" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')"></v-text-field>
            </div>
            <v-btn type="submit" class="w-full md:w-auto float-md-right" x-large color="warning">
                <v-icon>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>
        </form>
        <!-- <form class="flex flex-col justify-center items-center w-1/2">
            <img :src="team_re" class="w-32 animate__animated animate__fadeInDown" />
            <div class=" ">
                <h2 class="animate__animated animate__fadeInRight my-8 font-display font-bold text-xl text-gray-700 text-center">
                    ติดต่อขอรหัสผ่าน
                </h2>
                <div class="mt-8">

                        <div class="mt-6"> 
                            <button @click="$router.push('/forgot-admin')" type="submit" class="w-full animate__animated animate__slideInUp rounded-full p-3 bg-red-500 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >
                                <div class="text-white"> ติดต่อแอดมิน</div>
                            </button>
                        </div>

                        <div class="mt-6"> 
                            <button @click="$router.push('/forgot-user')" type="submit" class="w-full animate__animated animate__slideInUp rounded-full p-3 bg-red-500 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" >
                                <div class="text-white"> เปลี่ยนรหัสผ่านเอง</div>
                            </button>
                        </div>

                </div>
            </div>

        </form> -->
    </div>

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
