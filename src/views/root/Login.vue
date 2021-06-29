<template>
<div class="
      h-full
      w-full
      flex flex-col
      justify-center
      items-center
      pt-10
      pb-10
      md:pb-0
      md:pt-0
      bg-gray-100
    ">
    <v-card class="m-8 md:w-96 rounded-lg">
        <v-card-title class="bg1">
            <h2 class="text-sm text-white">
                {{
            _lang(
              "ยินดีต้อนรับเข้าสู่ตลาดควาย",
              "Welcome to the Buffalo Market",
              "歡迎來到布法羅市場"
            )
          }}
                <br />
                <span class="text-2xl font-semibold text-left text-white">
                    {{ _lang(" กรุณาเข้าสู่ระบบ", "Please login", "請登錄") }}</span>
            </h2>
            <br />
            <br />
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
            <v-alert v-if="errorText!=null" dense outlined type="error">
                {{ _lang('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง','Invalid username or password','无效的用户名或密码')}}
            </v-alert>
            <form @submit.prevent="login()" class="flex flex-col p-3">
                <div class="w-full mb-3">
                    <v-text-field v-model="form.username" required type="text" :label="
                _lang(
                  'กรุณาใส่ชื่อผู้ใช้',
                  'Please enter username',
                  '請輸入用戶名'
                )
              " filled rounded prepend-inner-icon="mdi-account-circle-outline"></v-text-field>
                </div>
                <div class="w-full mb-3">
                    <v-text-field v-model="form.password" required type="password" :label="
                _lang('กรุณาใส่รหัสผ่าน', 'Please enter password', '請輸入密碼')
              " filled rounded prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
                </div>
                <v-btn rounded large class="w-full bg1" dark type="submit">{{
            _lang("เข้าสู่ระบบ", "Login", "登录")
          }}</v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
            <div class="flex flex-col md:flex-row">
                <v-btn @click="$router.push('/forgot')" text color="orange">{{
            _lang("ลืมรหัสผ่าน", "forgot password", "忘记密码")
          }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/register')" text color="primary"><span v-html="
                _lang(
                  'สมาชิกใหม่? <b>ลงทะเบียน</b> ที่นี่',
                  'New member? <b> Register </b> here',
                  '新成员？ <b>在</ b>注册'
                )
              "></span></v-btn>
            </div>
        </v-card-actions>
    </v-card>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WebNav from "../../components/core/WebNav.vue";
import { Core } from "../../store/core";
import { Auth } from "../../store/auth";
@Component({
    components: {
        WebNav,
    },
    computed: {},
})
export default class Login extends Vue {
    form: any = {};
    errorText: any = null;
    async created() {
        await Auth.checkToken();
        if (Auth.logined) {
            await this.$router.replace("/");
        }
    }
    async login() {
        await Auth.reToken();
        let logined = await Core.postHttp(`/api/auth/login/`, this.form);
        if (logined.key) {
            await Auth.storeToken(logined.key);
            await Auth.storeTokenToStorage(logined.key);
            await this.$router.push("/");
            await location.reload();
        } else {
            this.errorText = logined.non_field_errors;
        }
    }
}
</script> 

<style scoped>
.bg1 {
    background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
