<template>
<div class="fixed w-full h-28 nav" style="z-index:100;  ">
    <div class="container">
        <div class="flex  overflow-y-hidden	overflow-x-auto	 " v-if="response">
            <v-btn @click="goPageTab(1)" small text dark>{{$txt.web_nav.product}}</v-btn>
            <v-btn @click="goPageTab(2)" small text dark> {{$txt.web_nav.map}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="gotoHelp()" small text dark> {{$txt.web_nav.help}}</v-btn>
            <v-btn @click="dialogLang = true" small text dark>{{$txt.web_nav.language}}</v-btn>

            <v-menu open-on-hover offset-y v-if="logined">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text small dark v-bind="attrs" v-on="on">
                        <v-icon>mdi-account-circle</v-icon>{{user.first_name}}
                    </v-btn>
                </template>

                <v-list>
                    <v-btn @click="$router.push('/user/profileuser')" text class="w-full">{{_lang('โปรไฟล์','Profile','个人资料')}}</v-btn>
                    <v-btn @click="$router.push('/user/post/')" text class="w-full">{{_lang('จัดการประกาศ','Announcements','管理公告')}}</v-btn>
                    <v-btn @click="logout()" text class="w-full">{{_lang('ออกจากระบบ','Logout','登出')}}</v-btn>
                </v-list>
            </v-menu>

            <v-btn v-if="!logined" @click="$router.push('/register')" small text dark> {{$txt.web_nav.register}}</v-btn>
            <v-btn v-if="!logined" @click="$router.push('/login')" small text dark> {{$txt.web_nav.login}}</v-btn>
            <v-btn class="invisible  md:visible" @click="$router.push('/register')" small outlined dark> {{$txt.web_nav.download}}</v-btn>
        </div>
        <div class="flex pt-4">
            <h2 style="cursor: pointer;" class="text-base md:text-2xl logo-font pon" @click="$router.push('/')">
                <v-icon>em em-water_buffalo</v-icon>&nbsp;{{$txt.name}}
            </h2>
            <form class="w-2/3 flex pl-4" @submit.prevent="goSearch()">
                <v-text-field v-model="search" solo :label="$txt.web_nav.searchTxt" dense></v-text-field>
                <v-btn outlined dark type="submit" class="ml-2">{{$txt.web_nav.search}}</v-btn>
            </form>
        </div>
    </div>
    <v-dialog v-model="dialogLang" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                {{$txt.language_choose}}
                <v-spacer></v-spacer>
                <v-btn @click="dialogLang = false" dark fab small color="red" class="elevation-0">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="flex flex-col">
                    <v-btn @click="changeLanguage('th')" color="success" class="elevation-0 transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90">ภาษาไทย</v-btn> <br>
                    <v-btn @click="changeLanguage('ch')" color="error" class="elevation-0 transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90">中文</v-btn><br>
                    <v-btn @click="changeLanguage('en')" color="primary" class="elevation-0 transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90">English</v-btn><br>
                </div>

            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script lang="ts">
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";

import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
    components: {

    },
    computed: {}
})

export default class Navbar extends Vue {
    dialogLang: boolean = false
    user: any = null
    search: any = ''
    response: boolean = false
    
    async created() {
        await Auth.checkToken();
        if (Auth.logined) {
            this.user = await Auth.getUser()
        }
        this.response = true;
    }
    get logined() {
        return Auth.logined;
    }
    async changeLanguage(language: string) {
        this.dialogLang = false
        await localStorage.setItem('language', language);
        await location.reload();
    }

    async goSearch() {
        await this.$router.push(`/?search=${this.search}`);
        await location.reload()
    }
    async goPageTab(tab: any) {
        await this.$router.push(`/?tab=${tab}`);
        await location.reload()
    }

    async logout() {
        await Auth.logout();
        await location.reload();
    }
    async gotoHelp() {
        await window.open(`https://docs.google.com/document/d/1JzhXn1UksQ9rgVzus0VwBAHBoieGpSKdV1jypj5B7XE/edit?usp=sharing`, '_blank');
        //await location.open('https://docs.google.com/document/d/1JzhXn1UksQ9rgVzus0VwBAHBoieGpSKdV1jypj5B7XE/edit?usp=sharing','_blank');
    }

    

}
</script>

<style>
.nav {
    /* background: rgb(238, 177, 123); */
    /* background: linear-gradient(90deg, rgba(238, 177, 123, 1) 0%, rgba(152, 63, 128, 1) 100%); */
    background: #0EAD69;
    /* background: #643fef; */
}
</style>
