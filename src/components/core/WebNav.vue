<template>
<div class="fixed w-full h-32 bg-beta" style="z-index:100;  ">
    <div class=" p-2 md:pl-20 md:pr-20 mt-6 md:pt-0">
        <div class="flex row-wrap overflow-y-hidden	overflow-x-auto p-1 " v-if="response">
            <v-btn @click="$router.push('/product')" small text dark>
                <v-icon>mdi-shopping-outline</v-icon>{{$txt.web_nav.product}}
            </v-btn>
            <v-btn @click="$router.push('/map')" small text dark>
                <v-icon>mdi-google-maps</v-icon> {{$txt.web_nav.map}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="gotoHelp()" small text dark>
                <v-icon>mdi-help</v-icon> {{$txt.web_nav.help}}
            </v-btn>
            <v-btn @click="dialogLang = true" small text dark>
                <v-icon>mdi-bookshelf</v-icon>{{$txt.web_nav.language}}
            </v-btn>

            <v-menu offset-y v-if="logined">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text small dark v-bind="attrs" v-on="on">
                        <v-icon>mdi-account-circle</v-icon>{{user.first_name}}
                    </v-btn>
                </template>

                <v-list>
                    <v-btn @click="$router.push('/user/profileuser')" text class="w-full">{{_lang('โปรไฟล์','Profile','个人资料')}}</v-btn>
                    <v-btn @click="$router.push('/user/myshop/')" text class="w-full">{{_lang('ร้านค้าของฉัน','My Shop','我的店鋪')}}</v-btn>
                    <v-btn color="error" @click="logout()" text class="w-full">{{_lang('ออกจากระบบ','Logout','登出')}}</v-btn>
                </v-list>
            </v-menu>

            <v-btn v-if="!logined" @click="$router.push('/register')" small text dark> {{$txt.web_nav.register}}</v-btn>
            <v-btn v-if="!logined" @click="$router.push('/login')" small text dark> {{$txt.web_nav.login}}</v-btn>
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mr-2" v-if="logined" small rounded v-bind="attrs" v-on="on">
                        <v-icon>mdi-feather</v-icon>{{$txt.web_nav.post}}
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="">
                        <i class="fas fa-store text-2xl pr-2"></i>{{_lang('เพิ่มประกาศ','Add announcement','添加公告')}}
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="dialog = false" fab small color="error">x</v-btn>
                    </v-card-title>

                    <v-card-text class="" v-if="farm.name && farm.farm_address">
                        <div class="m-4">
                            <v-btn @click="($router.push('/user/addpostbuy')) && (dialog=false)" depressed color="orange darken-4" dark x-large block rounded class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90 bg-btn">
                                {{_lang('เพิ่มประกาศซื้อ','Add buy announcement','添加购买公告')}}</v-btn>
                        </div>
                        <div class="m-4">
                            <v-btn @click="($router.push('/user/addpostsell')) && (dialog=false)" depressed color="orange darken-4" dark x-large block rounded class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90 bg-btn">
                                {{_lang('เพิ่มประกาศขาย','Add sell announcement','添加出售公告')}}</v-btn>
                        </div>
                    </v-card-text>
                    <v-card-text v-else>
                        <v-alert prominent dense type="error">*ไม่สามารถเพิ่มประกาศได้กรุณาระบุข้อมูลร้านค้าให้ครบถ้วน</v-alert>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-btn class="invisible  md:visible" @click="openStore()" small outlined rounded dark> {{$txt.web_nav.download}}</v-btn>
        </div>
        <div class="flex pt-2 ">
            <h2 style="cursor: pointer;" class="text-base md:text-2xl logo-font pon text-white mt-2" @click="$router.push('/')">
                &nbsp;{{$txt.name}}
            </h2>
            <form class="w-2/3 flex pl-4 p-2" @submit.prevent="goSearch()">
                <v-text-field dense prepend-inner-icon="fas fa-search" v-model="search" solo rounded name="name" :placeholder="$txt.web_nav.searchTxt" :label="$txt.web_nav.searchTxt"></v-text-field>
                <v-btn small type="submit" fab class=" ml-2" outlined dark>
                    <v-icon>mdi-shopping-search</v-icon>
                </v-btn>
            </form>
        </div>
    </div>

    <v-dialog v-model="dialogLang" scrollable :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card class="rounded-lg">
            <v-card-title primary-title>
                <i class="fas fa-globe-americas text-2xl pr-2"></i> {{$txt.language_choose}}
                <v-spacer></v-spacer>
                <v-btn @click="dialogLang = false" dark fab small color="red" class="elevation-0">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="flex flex-col mt-2">
                    <v-btn x-large @click="changeLanguage('th')" depressed rounded color="green darken-1" dark class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90 bg-btn">
                        ภาษาไทย</v-btn> <br>
                    <v-btn x-large @click="changeLanguage('ch')" depressed rounded color="red darken-1" dark class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90 bg-btn">
                        中文</v-btn><br>
                    <v-btn x-large @click="changeLanguage('en')" depressed rounded color="blue darken-1" dark class="transition duration-500 ease-in-out transform hover:-translate-x-1 hover:scale-90 bg-btn">
                        English</v-btn><br>
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
import { App } from "@/store/app";

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
    dialog: boolean = false
    farm: any = {}
    async created() {
        
        await Auth.checkToken();
        if (Auth.logined) {
            this.user = await Auth.getUser()
            this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
            if (!this.user.pk) {
                await Auth.logout();
                await location.reload();
            }
        }
        this.response = true;
    }
    get logined() {
        return Auth.logined;
    }
    async changeLanguage(language: string) {
        this.dialogLang = false
        await localStorage.setItem('language', language);
        await App.success("เปลี่ยนภาษาสำเร็จ")
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
        await App.success("ออกจากระบบสำเร็จ")
        await this.$router.push("/login")
        await location.reload();
        
        

    }
    async gotoHelp() {
        await window.open(`https://docs.google.com/document/d/1JzhXn1UksQ9rgVzus0VwBAHBoieGpSKdV1jypj5B7XE/edit?usp=sharing`, '_blank');
    }

    async openStore() {
        window.open('https://play.google.com/store/apps/details?id=com.buffalo.market');
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

.bg-btn {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
}

.bg-beta {
    background-color: #cf4a1e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23f0b030'/%3E%3Cstop offset='1' stop-color='%23cf4a1e'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%23e07d27'/%3E%3Cstop offset='1' stop-color='%23cf4a1e'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
