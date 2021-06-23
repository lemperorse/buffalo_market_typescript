<template>
<div class="p-2">
    <v-container grid-list-xs> 
    <div class="px-1 md:px-10 mx-auto w-full">
        <div>
            <v-row class="p-4 pb-6 ">
                <div>
                    <!-- <pre>{{user}}</pre> -->
                    <div class="pa-2 wrap elevation-0   ">
                        <span class="text-xl">ร้านค้าของฉัน</span>
                    </div>
                </div>
                <v-spacer></v-spacer>
                <div> 
                    <!-- <v-btn color="grey lighten-1" rounded elevation="0">
                        <i class="em em-female-technologist text-xl mr-2" aria-role="presentation" aria-label=""></i> <b>ติดต่อผู้ดูแลระบบ</b>
                    </v-btn> --> 
                </div> 
            </v-row>

            <div :class="(width > 1025)?`grid grid-cols-1 lg:grid-cols-3 gap-4`:''">
                <div class="m-2 w-full">
                    <Menu :name="_lang('ร้านค้าของฉัน','My shop','我的店鋪')" path="/user/profileuser?tab=4" image="./assets/ecommerce/050-warehouse.png" :head="_lang('ร้านค้าของฉัน','My shop','我的店鋪')" :txt="_lang('ชื่อสกุล ที่อยู่ อีเมล์ รวมถึงข้อมมูลส่วนตัวต่างๆ ของคุณ','Your full name, address, e-mail address, and other personal information.','您的全名、地址、電子郵件地址以及您的個人信息。')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                </div>
                <div class="m-2 w-full">
                    <Menu :name="_lang('รายการของฉัน','My list','我的列表')" path="/user/myshoplist" image="./assets/ecommerce/018-budget.png" :head="_lang('รายการของฉัน','My list','我的列表')" :txt="_lang('แสดงสถานะของประกาศต่างๆ และดูประกาศซื้อขายต่างๆได้','Show the status of various announcements and view various trading announcements','顯示各種公告的狀態 並查看各種交易公告')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                </div>
                <div class="m-2 w-full">
                    <Menu :name="_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')" path="/user/myshopbuy" image="./assets/ecommerce/015-shopping basket.png" :head="_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')" :txt="_lang('สามารถดูและแก้ไขสถานะประกาศซื้อต่างๆได้','Can view and edit the status of various purchase announcements.','可以查看和編輯各種購買公告的狀態。')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                </div> 
                <div class="m-2 w-full">
                    <Menu :name="_lang('ประกาศขายของฉัน','My sale announcement','我的銷售公告')" path="/user/myshopsell" image="./assets/ecommerce/032-discount.png" :head="_lang('ประกาศขายของฉัน','My sale announcement','我的銷售公告')" :txt="_lang('สามารถดูและแก้ไขสถานะประกาศขายต่างๆได้','Can view and edit the status of various listings','可以查看和編輯各種列表的狀態')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
                </div> 
                <div class="m-2 w-full">
                    <Menu :name="_lang('รายงานของฉัน','My report','我的報告')" path="/user/myshopreport" image="./assets/ecommerce/029-bar chart.png" :head="_lang('รายงานของฉัน','My report','我的報告')" :txt="_lang('รายงานเกี่ยวกับสถิติประกาศต่างๆ','Report on various announcement statistics','各種公告統計報表')" :caption="_lang('จัดการข้อมูล','Edit','調整')" />
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
.box {
    display: flex;
    width: 100%;
    height: 8px;
    margin: 5px 0px 60px 0px;
}

.box-sm {
    height: 8px;
    margin: 0;
    flex-grow: 1;
    transition: all .8s ease-in-out;
    cursor: pointer;
}

.box-sm:hover {
    flex-grow: 12;
}
</style>
