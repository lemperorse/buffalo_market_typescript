<template>
<!-- <div>
    <button @click="$router.go(-1)" class="p-3 text-red-600">
        <i class="fas fa-arrow-circle-left text-3xl"></i>
    </button>

    <div class="p-4">
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
    </div>

</div> -->
<div class="h-full w-full flex flex-col justify-center items-center" style="background-color:#f2f2f2">
    <h2 class="text-3xl">{{_lang('ลืมรหัสผ่าน','Forgot password','忘記密碼')}}</h2>
    <v-card class="w-full md:w-96">
        <v-card-text>
            <form v-if="step==1" @submit.prevent="foundUser()">
                <!-- <v-text-field v-model="form.personal_id" filled label="ระบุเลขบัตรประจำตัวประชาชน"></v-text-field>
                <v-text-field v-model="form.tel" filled label="เบอร์โทร"></v-text-field>
                <v-btn type="submit" class="w-full" color="success">ยืนยัน</v-btn> -->

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('เลขบัตรประจำตัวประชาชน','ID card number','身份證號碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="far fa-address-card text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.username" type="text" :placeholder="_lang('ระบุเลขบัตรประจำตัวประชาชน','Specify the ID card number','指定身份證號')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('เบอร์โทร','Phone number','電話號碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-mobile-alt text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.username" type="text" :placeholder="_lang('เบอร์โทร','Phone number','電話號碼')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <button type="submit" class="w-full rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <div class="text-white">{{_lang('ยืนยัน','Confirm','確認')}}</div>
                </button>

            </form>

            <form v-if="step==2" @submit.prevent="changePassword()">

                <!-- <div class="flex flex-wrap">
                    <v-text-field type="password" required prepend-inner-icon="mdi-lock" class="w-full " v-model="formPassword.password" filled :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field>
                    <v-text-field type="password" required prepend-inner-icon="mdi-lock" class="w-full " filled v-model="formPassword.password2" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')"></v-text-field>
                </div>
                <v-btn type="submit" class="w-full md:w-auto float-md-right" x-large color="warning">
                    <v-icon>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
                </v-btn> -->

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('รหัสผ่าน','Password','密码')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="formPassword.password" type="password" :placeholder="_lang('รหัสผ่าน','Password','密码')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="formPassword.password2" type="password" :placeholder="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <button type="submit" class="w-full rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <div class="text-white">{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}</div>
                </button>

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
