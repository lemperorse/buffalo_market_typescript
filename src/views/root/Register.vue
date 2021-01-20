<template> 
<div class="h-full w-full flex flex-col justify-center items-center " style="background-color:#f2f2f2"> 
    <h2 @click="$router.push('/')" class="text-3xl mt-8 mb-4">{{_lang('สมัครสมาชิก','Register','寄存器')}}</h2>
    <v-card class="w-full md:w-96">
        <v-card-text>
            <form @submit.prevent="register">
                <!-- <v-text-field required v-model="form.username" filled label="ชื่อผู้ใช้"></v-text-field>
                <v-text-field type="password" required v-model="form.password" filled label="รหัสผ่าน"></v-text-field>
                <v-text-field type="password" required v-model="form.password2" filled label="ยืนยันรหัสผ่าน"></v-text-field>
                <v-text-field required v-model="form.first_name" filled label="ชื่อ"></v-text-field>
                <v-text-field required v-model="form.last_name" filled label="สกุล"></v-text-field>
                <v-btn class="w-full" type="submit" large color="success">สมัครสมาชิก</v-btn> -->
                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ชื่อผู้ใช้งาน','Username','用戶名')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                            <i class="fas fa-user text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.username" type="text" :placeholder="_lang('กรุณาใส่ชื่อผู้ใช้','Please enter username','請輸入用戶名')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('รหัสผ่าน','Password','密碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.password" type="password" :placeholder="_lang('กรุณาใส่รหัสผ่าน','Please enter password','請輸入密碼')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ยืนยันรหัสผ่าน','Confirm password','確認密碼')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                            <i class="fas fa-key text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.password2" type="password" :placeholder="_lang('กรุณายืนยันรหัสผ่าน','Please confirm password','請確認密碼。')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('ชื่อ','Firstname','名字')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                            <i class="far fa-address-card text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.first_name" type="text" :placeholder="_lang('กรุณาใส่ชื่อจริง','Please enter your first name','請輸入您的名字')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <div class="relative w-full mb-3">
                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                        {{_lang('นามสกุล','Lastname','姓')}}
                    </label>
                    <div class="mb-3 rounded bg-gray-200">
                        <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                            <i class="far fa-address-card text-lg text-gray-500"></i>
                        </span>
                        <input required v-model="form.last_name" type="text" :placeholder="_lang('กรุณาใส่นามสกุล','Please enter last name','請輸入姓氏')" class="p-3 w-full pl-10 hover:shadow-lg" />
                    </div>
                </div>

                <button type="submit" class="w-full rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <div class="text-white">{{_lang('สมัครสมาชิก','Register','寄存器')}}</div>
                </button>

            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex flex-col md:flex-row ">
                <v-btn @click="$router.push('/login')" text color="primary"><span v-html="_lang('มีบัญชีอยู่แล้ว? <b>เข้าสู่ระบบ</b> ที่นี่','New member? <b> Register </b> here','新成员？ <b>在</ b>注册')"></span></v-btn>
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
