<template>
<div class="bg">
    <div class="container mx-auto " v-if="response"> 
        <div class="w-full p-2 mb-6">
            <ol class="flex text-gray-700 bg-gray-300 rounded py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
                <li class="text-gray-500 select-none">/</li> 
                <li class="px-2 text-green-600">{{_lang('โปรไฟล์','Profile','輪廓')}}</li>
            </ol> 
        </div>
        <div class="flex flex-wrap">
            <div class="w-full lg:w-3/12 px-2">
                <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg border-l-4 border-green-500">
                    <div class="px-5">
                        <div class="flex flex-col justify-center  items-center">
                            <img v-if="profile.profile_image" ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" :src="$server+'/'+profile.profile_image" />
                            <img v-else ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
                            <input type="file" ref="profile" @change="profileChange" style="display:none;" />

                            <h2 class="text-base font-semibold" v-if="user">{{user.first_name}} &nbsp; {{user.first_name}}</h2>
                            <h2 v-if="user">@{{user.first_name}}</h2>
                            <v-btn @click="$refs.profile.click()" rounded color="success">{{_lang('เปลี่ยนรูปโปรไฟล์','Change Profile Image','变更个人资料图片')}}</v-btn>
                        </div>

                        <hr class="mt-6">

                        <ul class="flex mb-0 list-none flex-col pt-3 pb-4 ">
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-green-600 bg-white': openTab !== 1, 'text-white bg-green-600': openTab === 1}">
                                    <i class="fas fa-user text-base mr-1"></i>{{_lang('ข้อมูลทั่วไป','General information','一般信息')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto  ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-green-600 bg-white': openTab !== 2, 'text-white bg-green-600': openTab === 2}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('บัตรประชาชน','ID Card','身份證')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-green-600 bg-white': openTab !== 3, 'text-white bg-green-600': openTab === 3}">
                                    <i class="far fa-address-book text-base mr-1"></i>{{_lang('ช่องทางการติดต่ออื่นๆ','Other contact','其他聯繫渠道')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-green-600 bg-white': openTab !== 4, 'text-white bg-green-600': openTab === 4}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('ข้อมูลผู้ขาย','Seller information','賣家信息')}}
                                </div>
                            </li>

                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-green-600 bg-white': openTab !== 5, 'text-white bg-green-600': openTab === 5}">
                                    <i class="fas fa-cog text-base mr-1"></i>{{_lang('ตั้งค่า','Set up','設定')}}
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <div class="w-full lg:w-8/12 px-2">
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded border-l-4 border-green-500">
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
                </div>
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
.bg {
    background-color: #F5F5F5;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.btn {
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 16px;
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

a {
    color: black !important;
}

a:link {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
