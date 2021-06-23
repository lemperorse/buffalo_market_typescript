<template>
<div class="fixed w-full h-28 bg-nav" style="z-index:100;  ">
    <div class=" p-2 md:pl-20 md:pr-20 ">
        <div class="flex  overflow-y-hidden	overflow-x-auto	 " v-if="response">
            <v-btn @click="goPageTab(1)" small text dark>{{$txt.web_nav.product}}</v-btn>
            <v-btn @click="goPageTab(2)" small text dark> {{$txt.web_nav.map}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="gotoHelp()" small text dark> {{$txt.web_nav.help}}</v-btn>
            <v-btn @click="dialogLang = true" small text dark>{{$txt.web_nav.language}}</v-btn>

            <v-menu offset-y v-if="logined">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text small dark v-bind="attrs" v-on="on">
                        <v-icon>mdi-account-circle</v-icon>{{user.first_name}}
                    </v-btn>
                </template>

                <v-list>
                    <v-btn @click="$router.push('/user/profileuser')" text class="w-full">{{_lang('โปรไฟล์','Profile','个人资料')}}</v-btn>
                    <!-- <v-btn @click="$router.push('/user/post/')" text class="w-full">{{_lang('ร้านค้าของฉัน','My Shop','我的店鋪')}}</v-btn> -->
                    <v-btn @click="$router.push('/user/myshop/')" text class="w-full">{{_lang('ร้านค้าของฉัน','My Shop','我的店鋪')}}</v-btn>
                    <v-btn color="error" @click="logout()" text class="w-full">{{_lang('ออกจากระบบ','Logout','登出')}}</v-btn>
                </v-list>
            </v-menu> 

            <v-btn v-if="!logined" @click="$router.push('/register')" small text dark> {{$txt.web_nav.register}}</v-btn>
            <v-btn v-if="!logined" @click="$router.push('/login')" small text dark> {{$txt.web_nav.login}}</v-btn>
            <v-btn @click="$router.push('/user/addpostbuy')" small rounded dark>{{$txt.web_nav.post}}</v-btn>
            <v-btn class="invisible  md:visible" @click="$router.push('/register')" small outlined rounded dark> {{$txt.web_nav.download}}</v-btn>
        </div>
        <div class="flex pt-2 ">
            <h2 style="cursor: pointer;" class="text-base md:text-2xl logo-font pon text-white mt-2" @click="$router.push('/')">
                &nbsp;{{$txt.name}}
            </h2>
            <form class="w-2/3 flex pl-4" @submit.prevent="goSearch()">
                <!-- <div class="bg-white flex rounded-full shadow-lg ">
                    <span class="w-auto flex justify-end items-center text-gray-500 p-3">
                        <i class="fas fa-search text-xl"></i>
                    </span>
                    <input class="w-full " type="text" :placeholder="$txt.web_nav.searchTxt" v-model="search">
                    <v-btn type="submit" fab class="bgs " dark>{{$txt.web_nav.search}}</v-btn>
                </div> -->
                <v-text-field prepend-inner-icon="fas fa-search" v-model="search"  solo rounded name="name" :placeholder="$txt.web_nav.searchTxt" :label="$txt.web_nav.searchTxt"   ></v-text-field>
                <v-btn type="submit" fab class=" ml-2" color=""  >{{$txt.web_nav.search}}</v-btn>
            </form>
        </div>
    </div>

    <v-dialog v-model="dialogLang" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card class="rounded-lg">
            <v-card-title primary-title>
                {{$txt.language_choose}}
                <v-spacer></v-spacer>
                <v-btn @click="dialogLang = false" dark fab small color="red" class="elevation-0">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="flex flex-col mt-2">
                    <v-btn @click="changeLanguage('th')" depressed rounded color="success" class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90"> ภาษาไทย</v-btn> <br>
                    <v-btn @click="changeLanguage('ch')" depressed rounded color="error" class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90"> 中文</v-btn><br>
                    <v-btn @click="changeLanguage('en')" depressed rounded color="primary" class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90"> English</v-btn><br>
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
        await this.$router.push(`/product?search=${this.search}`);
        await location.reload()
    }
    async goPageTab(tab: any) {
        await this.$router.push(`/?tab=${tab}`);
        await location.reload()
    }

    async logout() {
        await Auth.logout();
        await this.$router.push("/")
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
    background-color: #330000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23D18'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bgnav1 {
    background: linear-gradient(to right, #0EAD69 0%, #06D6A0 100%);
    /* background-color: #0ead69;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover; */

}

.bgs {
    background: linear-gradient(to right, #06D6A0 0%, #06D6A0 100%);
}

.bg-nav {
    background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
