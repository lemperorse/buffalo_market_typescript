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
<div class="h-full w-full flex flex-col justify-center items-center bg2" >
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
                    <div class="mb-3 rounded bg-gray-100 border">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="far fa-address-card text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.username" type="text" :placeholder="_lang('ระบุเลขบัตรประจำตัวประชาชน','Specify the ID card number','指定身份證號')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('เบอร์โทร','Phone number','電話號碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-100 border">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-mobile-alt text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.username" type="text" :placeholder="_lang('เบอร์โทร','Phone number','電話號碼')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>

                <button type="submit" class="w-full btn green1">
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
                    <div class="mb-3 rounded bg-gray-100 border">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="formPassword.password" type="password" :placeholder="_lang('รหัสผ่าน','Password','密码')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-100 border">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="formPassword.password2" type="password" :placeholder="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                    </div>
                </div>

                <button type="submit" class="w-full btn green1">
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
 <style scoped>
/* Helper classes */ 
.bg2 {
    /* background-color:#f2f2f2" */
    background-color: #F5F5F5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
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
