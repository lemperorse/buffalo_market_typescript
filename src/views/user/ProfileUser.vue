<template>
<div>
    <div class="container mx-auto " v-if="response"> 
        <div class="w-full p-2">
            <ol class="flex text-gray-700 bg-gray-300 rounded-full py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li> 
                <li class="text-gray-500 select-none">/</li> 
                <li class="px-2 text-green-600">{{_lang('โปรไฟล์','Profile','輪廓')}}</li>
            </ol> 
        </div>
        <div class="flex flex-wrap">
            <div class="w-full lg:w-3/12 px-2 pb-2">
                <!-- <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg border-l-4 border-green-500"> -->
                <v-card class="rounded-lg">
                    <div class="px-5">
                        <div class="flex flex-col justify-center  items-center">
                            <img v-if="profile.profile_image" ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" :src="$server+'/'+profile.profile_image" />
                            <img v-else ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
                            <input type="file" ref="profile" @change="profileChange" style="display:none;" />

                            <h2 class="text-base font-semibold" v-if="user">{{user.first_name}} &nbsp; {{user.first_name}}</h2>
                            <h2 v-if="user">@{{user.first_name}}</h2>
                            <v-btn @click="$refs.profile.click()" rounded class="bgbtn" dark>{{_lang('เปลี่ยนรูปโปรไฟล์','Change Profile Image','变更个人资料图片')}}</v-btn>
                        </div>

                        <hr class="mt-6">

                        <ul class="flex mb-0 list-none flex-col pt-3 pb-4 ">
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-green-600 bg-white': openTab !== 1, 'text-white bgbtn': openTab === 1}">
                                    <i class="fas fa-user text-base mr-1"></i>{{_lang('ข้อมูลทั่วไป','General information','一般信息')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto  ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-green-600 bg-white': openTab !== 2, 'text-white bgbtn': openTab === 2}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('บัตรประชาชน','ID Card','身份證')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-green-600 bg-white': openTab !== 3, 'text-white bgbtn': openTab === 3}">
                                    <i class="far fa-address-book text-base mr-1"></i>{{_lang('ช่องทางการติดต่ออื่นๆ','Other contact','其他聯繫渠道')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-green-600 bg-white': openTab !== 4, 'text-white bgbtn': openTab === 4}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('ข้อมูลผู้ขาย','Seller information','賣家信息')}}
                                </div>
                            </li>

                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-green-600 bg-white': openTab !== 5, 'text-white bgbtn': openTab === 5}">
                                    <i class="fas fa-cog text-base mr-1"></i>{{_lang('ตั้งค่า','Set up','設定')}}
                                </div>
                            </li>
                        </ul>

                    </div>
                </v-card>
                <!-- </div> -->
            </div>

            <div class="w-full lg:w-8/12 px-2">
                <!-- <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded border-l-4 border-green-500"> -->
                <v-card class="rounded-lg"> 
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                                <Profile v-if="openTab === 1" />
                            </div>

                            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                                <IDcard v-if="openTab === 2" />
                            </div>

                            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                                <Contact v-if="openTab === 3" />
                            </div>

                            <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                                <SellerDetail v-if="openTab === 4" />
                            </div>

                            <div v-bind:class="{'hidden': openTab !== 5, 'block': openTab === 5}">
                                <Manager v-if="openTab === 5" />
                            </div>
                        </div>
                    </div>
                </v-card>
                <!-- </div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';

import Profile from '@/components/profile/Tab/Profile.vue';
import IDcard from '@/components/profile/Tab/IDcard.vue';
import Contact from '@/components/profile/Tab/Contact.vue';
import SellerDetail from '@/components/profile/Tab/SellerDetail.vue';
import Manager from '@/components/profile/Tab/Manager.vue';
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
@Component({
    components: {

        Profile,
        IDcard,
        Contact,
        SellerDetail,
        Manager,
    },
    computed: {},
    props: {
        color: {
            default: "light",
            validator: function (value) {
                return ["light", "dark"].indexOf(value) !== -1;
            },
        },
    }
})

export default class Table extends Vue {
    user: any = null
    response: boolean = false
    private openTab: number = 1
    profile: any = {}
    form: any = null;
    async created() {
        await Auth.checkToken();
        if (Auth.logined) {
            this.user = await Auth.getUser()
            await this.loadProfile()

        }

        this.response = true;
    }

    async loadProfile() {
        let user = await Core.getHttp(`/api/default/profile/?user=${this.user.pk}`)
        if (user.length > 0) {
            this.profile = await Core.getHttp(`/api/user/profile/image/${user[0].id}/`)
            if (this.profile.profile_image) {
                let imageProfile: any = this.$refs.imageProfile
                console.log(imageProfile);
            } else {

            }
        } else {
            alert('กรุณาระบุข้อมูลส่วนตัว')
        }

    }

    async profileChange(event: any) {
        let file = await this.getBase64(event.target.files[0])
        let imageProfile: any = this.$refs.imageProfile
        imageProfile.src = file
        this.profile.profile_image = file
        let data = await Core.putHttp(`/api/user/profile/image/${this.profile.id}/`, this.profile)
        if (data.id) {
            alert("success")
        }
    }

    async getBase64(file: any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    toggleTabs(tabNumber: number) {
        this.openTab = tabNumber
    }

}
</script>

<style scoped> 
.bg1 {
    background-color: #0EAD69;
}

a {
    color: black !important;
}

a:link {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.bgbtn{
    background-color: #0ead69;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
