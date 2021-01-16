<template>
<div>
    <button @click="$router.go(-1)" class="p-3 text-red-600">
        <i class="fas fa-arrow-circle-left text-3xl"></i>
    </button>
    <div class="p-4">
        <h2 class="text-2xl">สมัครสมาชิก</h2>
        <form @submit.prevent="register" >
            <v-text-field required v-model="form.username" filled label="ชื่อผู้ใช้"></v-text-field>
            <v-text-field type="password" required v-model="form.password" filled label="รหัสผ่าน"></v-text-field>
            <v-text-field type="password" required v-model="form.password2" filled label="ยืนยันรหัสผ่าน"></v-text-field>
            <v-text-field required v-model="form.first_name" filled label="ชื่อ"></v-text-field>
            <v-text-field required v-model="form.last_name" filled label="สกุล"></v-text-field>
            <v-btn class="w-full" type="submit" color="success">สมัครสมาชิก</v-btn> 
        </form>
       
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

    form: any = {}
    async created() {

    }

    async register() {
        let storeUser = await Core.postHttp(`api/register/`, this.form)
        if (storeUser.id) {
            alert('สมัครสมาชิกสำเร็จ'); 
            await this.$router.push('/login')
        }else{
            alert('สมัครสมาชิกไม่สำเร็จ'); 
        }
    }

}
</script>
