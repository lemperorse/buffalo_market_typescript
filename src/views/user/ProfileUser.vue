<template>
<div class="bg-gray-100 mt-4">
    <div class="container mx-auto " v-if="response"> 
        <div class="w-full p-2">
            <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2 mt-4 items-center">
                <li class="px-2 text-sm"><span @click="$router.push('/')" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</span></li> 
                <li class="text-gray-500 select-none">/</li> 
                <li class="px-2 text-sm text-yellow-600">{{_lang('โปรไฟล์','Profile','輪廓')}}</li>
            </ol> 
        </div>
        <div class="flex flex-wrap">
            <div class="w-full lg:w-3/12 px-2 pb-2 mt-4">
                <!-- <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg border-l-4 border-green-500"> -->
                <div class="rounded-lg bg-white shadow">
                    <div class="px-5">
                        <div class="flex flex-col justify-center  items-center">
                            <img v-if="profile.profile_image" ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" :src="$server+'/'+profile.profile_image" />
                            <img v-else ref="imageProfile" class="mt-4 shadow-xl h-28 w-28 rounded-full align-middle border-none" src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" />
                            <input type="file" ref="profile" @change="profileChange" style="display:none;" />

                            <h2 class="text-base font-semibold" v-if="user">{{user.first_name}} &nbsp; {{user.first_name}}</h2>
                            <h2 v-if="user">@{{user.first_name}}</h2>
                            <v-btn @click="$refs.profile.click()" rounded color="orange darken-4" depressed dark>{{_lang('เปลี่ยนรูปโปรไฟล์','Change Profile Image','变更个人资料图片')}}</v-btn>
                        </div>

                        <hr class="mt-6">

                        <ul class="flex mb-0 list-none flex-col pt-3 pb-4 ">
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-yellow-600 bg-white': openTab !== 1, 'text-white bgbtn': openTab === 1}">
                                    <i class="fas fa-user text-base mr-1"></i>{{_lang('ข้อมูลทั่วไป','General information','一般信息')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto  ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-yellow-600 bg-white': openTab !== 2, 'text-white bgbtn': openTab === 2}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('บัตรประชาชน','ID Card','身份證')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-yellow-600 bg-white': openTab !== 3, 'text-white bgbtn': openTab === 3}">
                                    <i class="far fa-address-book text-base mr-1"></i>{{_lang('ช่องทางการติดต่ออื่นๆ','Other contact','其他聯繫渠道')}}
                                </div>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-yellow-600 bg-white': openTab !== 4, 'text-white bgbtn': openTab === 4}">
                                    <i class="far fa-id-card text-base mr-1"></i>{{_lang('ข้อมูลผู้ขาย','Seller information','賣家信息')}}
                                </div>
                            </li>

                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <div class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded-full block leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-yellow-600 bg-white': openTab !== 5, 'text-white bgbtn': openTab === 5}">
                                    <i class="fas fa-cog text-base mr-1"></i>{{_lang('ตั้งค่า','Set up','設定')}}
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                <!-- </div> -->
            </div>

            <div class="w-full lg:w-8/12 px-2 mt-4">
                <!-- <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded border-l-4 border-green-500"> -->
                <div class="rounded-lg bg-white shadow"> 
                    <div class="px-4 py-5 ">
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
                                <SellerDetail @changePage="changePages" v-if="openTab === 4" />
                            </div>

                            <div v-bind:class="{'hidden': openTab !== 5, 'block': openTab === 5}">
                                <Manager v-if="openTab === 5" />
                            </div>
                        </div>
                    </div>
                </div>
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
import { App } from "@/store/app";
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
        await Core.switchLoad(true)
        await Auth.checkToken();
        if (Auth.logined) {
            this.user = await Auth.getUser()
            await this.loadProfile()

        }
        await this.getTab();
        await Core.switchLoad(false)
        this.response = true;
    }
    
    async getTab(){
        let tab = this.$route.query.tab 
        if(tab){ 
            this.openTab = Number(tab)
        }
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
            await App.success("กรุณาระบุข้อมูลส่วนตัว") 
        }

    }

    async profileChange(event: any) {
        let file = await this.getBase64(event.target.files[0])
        let imageProfile: any = this.$refs.imageProfile
        imageProfile.src = file
        this.profile.profile_image = file
        let data = await Core.putHttp(`/api/user/profile/image/${this.profile.id}/`, this.profile)
        if (data.id) {
            this.profile.profile_image = data.profile_image
            await App.success("สำเร็จ")  

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

    changePages(val:number){
        this.openTab = val
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
    background-color: #ee5522;
}
</style>
