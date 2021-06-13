<template>
<div>

      <h2 class="font-semibold text-2xl">{{_lang('เปลี่ยนรหัสผ่าน','Change Password','更改密码')}}</h2><br>
    <v-alert dense border="left" type="warning">{{_lang('หากต้องการแก้ไขข้อมูล ให้ทำการกรอกข้อมูลที่ต้องการแก้ไขแล้วกด "บันทึกการเปลี่ยนแปลง" ','To edit information Please fill in the information you want to edit and press "Save changes"','请填写您要编辑的信息 然后单击保存更改')}}</v-alert>

    <div>
        <form @submit.prevent="changePassword()">
            <div class="flex flex-wrap">
                <v-text-field rounded type="password" required prepend-inner-icon="mdi-lock" class="w-full "   v-model="formPassword.password" filled :label="_lang('รหัสผ่าน','Password','密码')"></v-text-field>
                <v-text-field rounded type="password" required prepend-inner-icon="mdi-lock"  class="w-full " filled v-model="formPassword.password2" :label="_lang('ยืนยันรหัสผ่าน','Confirm password','确认密码')"></v-text-field>
            </div> 
            <v-btn large rounded class="w-full" type="submit" color="success">
                <v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึกการเปลี่ยนแปลง','Save Change','保存更改')}}
            </v-btn>
        </form> 
    </div>
 
 

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';

import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
@Component({
    components: {},
    computed: {}
})

export default class Profile extends Vue {
    formPassword: any = {}
 
    response: boolean = false
    async created() {
      
        this.response = true;
    } 

    async changePassword(event: any) {
        let user = await User.getUser()
        if (this.formPassword.password == this.formPassword.password2) {
            let change = await Core.putHttp(`/api/user/password/${user.pk}/`, this.formPassword)
            this.formPassword = {}
            if (change.id) {
                alert('เปลี่ยนรหัสผ่านสำเร็จ');
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
.f-white {
    color: white !important;
}

.btn {
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 18px;
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

.orange1 {
    background-color: #FB8500;
    box-shadow: 0px 5px 0px 0px #CD6509;
}
.orange1:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
}
</style>
