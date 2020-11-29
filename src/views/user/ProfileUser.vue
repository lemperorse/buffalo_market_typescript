<template>
<div class="bg-gray-100">
    <div class="container mx-auto ">
        <div class="flex flex-wrap">
            <div class="w-full lg:w-4/12 px-4">
                <div class="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                    <div class="px-6">
                        <div class="flex flex-wrap">
                            <img ref="profileImage" alt="..." src="https://sv1.picz.in.th/images/2020/11/04/bQMzml.jpg" class="mt-4 shadow-xl h-16 rounded-full align-middle border-none" />
                            <div class="flex flex-col pl-4">
                                <div class="text-sm mt-4">
                                    <i class="fas fa-user mr-2"></i>username
                                </div>
                                <div class="text-sm mt-4">
                                    <i class="fas fa-at mr-2"></i>emailemail@email.com
                                </div>
                            </div>
                        </div>

                        <hr class="mt-6">

                        <ul class="flex mb-0 list-none flex-col pt-3 pb-4 ">
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <a class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-green-600 bg-white': openTab !== 1, 'text-white bg-green-600': openTab === 1}">
                                    <i class="fas fa-user text-base mr-1"></i>ข้อมูลทั่วไป
                                </a>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto  ">
                                <a class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-green-600 bg-white': openTab !== 2, 'text-white bg-green-600': openTab === 2}">
                                    <i class="far fa-id-card text-base mr-1"></i> บัตรประชาชน
                                </a>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <a class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-green-600 bg-white': openTab !== 3, 'text-white bg-green-600': openTab === 3}">
                                    <i class="far fa-address-book text-base mr-1"></i> ช่องทางการติดต่ออื่นๆ
                                </a>
                            </li>
                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <a class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-green-600 bg-white': openTab !== 4, 'text-white bg-green-600': openTab === 4}">
                                    <i class="far fa-id-card text-base mr-1"></i> ข้อมูลผู้ขาย
                                </a>
                            </li>

                            <li class="-mb-px mr-2 last:mr-0 flex-auto ">
                                <a class="text-xs font-bold uppercase px-5 py-3 cursor-pointer rounded block leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-green-600 bg-white': openTab !== 5, 'text-white bg-green-600': openTab === 5}">
                                    <i class="fas fa-cog text-base mr-1"></i> ตั้งค่า
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <div class="w-full lg:w-8/12 px-4">
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
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
    private openTab: number = 1
    private async created() {}
    toggleTabs(tabNumber: number) {
        this.openTab = tabNumber
    }

}
</script>
