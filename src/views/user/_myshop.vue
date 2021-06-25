<template>
<div class="p-2 bg-gray-100 h-full">
    <v-container grid-list-xs>
        <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2">
            <li class="px-2"><a href="/#/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2 text-green-600">{{_lang('ร้านค้าของฉัน','My shop','我的店鋪')}}</li>
        </ol>
        <div class="px-1 pt-4 md:px-10 mx-auto w-full">
            <div>
                <v-row class="p-4 pb-6 ">
                    <div>
                        <!-- <pre>{{user}}</pre> -->
                        <div class="pa-2 wrap elevation-0   ">
                            <span class="text-xl"><i class="em em-department_store p-4" aria-role="presentation" aria-label="DEPARTMENT STORE"></i> ร้านค้าของฉัน</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                </v-row>

                <div :class="(width > 1025)?`grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-4`:''">
                    <div class="m-2 w-full">
                        <Menu class="rounded-lg" :name="_lang('ร้านค้าของฉัน','My shop','我的店鋪')" path="/user/profileuser" image="./assets/ecommerce/050-warehouse.png" :head="_lang('ร้านค้าของฉัน','My shop','我的店鋪')" :txt="_lang('ชื่อสกุล ที่อยู่ อีเมล์ รวมถึงข้อมมูลส่วนตัวต่างๆ ของคุณ','Your full name, address, e-mail address, and other personal information.','您的全名、地址、電子郵件地址以及您的個人信息。')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                    </div>
                    <!-- <div class="m-2 w-full">
                        <Menu :name="_lang('รายการของฉัน','My list','我的列表')" path="/user/myshoplist" image="./assets/ecommerce/018-budget.png" :head="_lang('รายการของฉัน','My list','我的列表')" :txt="_lang('แสดงสถานะของประกาศต่างๆ และดูประกาศซื้อขายต่างๆได้','Show the status of various announcements and view various trading announcements','顯示各種公告的狀態 並查看各種交易公告')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                    </div> -->
                    <div class="m-2 w-full">
                        <Menu class="rounded-lg" :name="_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')" path="/user/myshopbuy" image="./assets/ecommerce/shopping-basket.png" :head="_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')" :txt="_lang('สามารถดูและแก้ไขสถานะประกาศซื้อต่างๆได้','Can view and edit the status of various purchase announcements.','可以查看和編輯各種購買公告的狀態。')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                    </div>
                    <div class="m-2 w-full">
                        <Menu class="rounded-lg" :name="_lang('ประกาศขายของฉัน','My sale announcement','我的銷售公告')" path="/user/myshopsell" image="./assets/ecommerce/032-discount.png" :head="_lang('ประกาศขายของฉัน','My sale announcement','我的銷售公告')" :txt="_lang('สามารถดูและแก้ไขสถานะประกาศขายต่างๆได้','Can view and edit the status of various listings','可以查看和編輯各種列表的狀態')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                    </div>
                    <div class="m-2 w-full">
                        <Menu class="rounded-lg" :name="_lang('รายงานของฉัน','My report','我的報告')" path="/user/myshopreport" image="./assets/ecommerce/029-bar chart.png" :head="_lang('รายงานของฉัน','My report','我的報告')" :txt="_lang('รายงานเกี่ยวกับสถิติประกาศต่างๆ','Report on various announcement statistics','各種公告統計報表')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                    </div>
                </div>

            </div>
        </div>
    </v-container>
</div>
</template>

<script lang="ts">
import Menu from "@/components/core/myshop/Menu.vue";

import {
    Component,
    Vue,
} from 'vue-property-decorator';

import {
    mapState
} from 'vuex';

import {
    User
} from '@/store/user'

import {
    Geography
} from '@/models/core'
import {
    Core
} from '@/store/core'
import _ from 'lodash'
@Component({
    components: {
        Menu
    },
    computed: {

    }
})
export default class Home extends Vue {

    width: any = this.$vuetify.breakpoint.width

    async created() {

    }

}
</script>

<style scoped>
.bg-home {
    background-color: #ededed;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
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
