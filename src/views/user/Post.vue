<template>
<!-- <v-app> -->
<div class="" v-if="!products.farm">  
    <!-- <pre>{{user}}</pre> -->
    <!-- <pre>{{profile.user}}</pre> -->
    <!-- <pre>{{products.farm}}</pre> -->
    <div class="container mx-auto" >
        <div class="w-full ">
            <ol class="flex text-gray-700 bg-gray-300 rounded-full py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li> 
                <li class="text-gray-500 select-none">/</li> 
                <li class="px-2 text-green-600">{{_lang('จัดการประกาศ','Manage announcements','管理公告')}}</li>
            </ol> 
        </div>

        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {{_lang('ประกาศของ','Announcement of','公告')}} {{user.first_name}}
        </h2>
        
        <v-toolbar class="mb-4 rounded-lg elevation-0">
            <template>
                <v-tabs class="rounded" color="teal accent-3" v-model="tabs" next-icon="mdi-arrow-right-bold-circle-outline" prev-icon="mdi-arrow-left-bold-circle-outline" show-arrows>
                    <v-tab class="font-weight-black">{{_lang('ประกาศซื้อ','Buy','購買')}}</v-tab>
                    <v-tab class="font-weight-black">{{_lang('ประกาศขาย','Sell','賣')}}</v-tab>
                    <v-tab class="font-weight-black">{{_lang('รายงาน','Report','報告')}}</v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
            <v-tab-item class=" " >
                <PostBuy />
            </v-tab-item>
            <v-tab-item class=" ">
                <PostSell />
            </v-tab-item>
            <v-tab-item class="">
                <div class="p-2">
                    <h2 class="text-2xl font-bold">{{_lang('รายงาน สถิติ','Report','報告')}}</h2>
                    <v-card class="p-2 mt-2">
                        <h2>{{_lang('จำนวนรายการที่ขายได้','Number of items sold','銷售數量')}}</h2>
                        <h2 class="text-3xl">{{productsEnd.length}}</h2>
                    </v-card>
                    <!-- <pre>{{data}}</pre> -->
                    <v-card class="bg1">
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline :labels="labels" :value="value" color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth>

                            </v-sparkline>
                        </v-sheet>
                    </v-card>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</div>

<!-- </v-app> -->
</template>

<script lang="ts">
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import PostBuy from "@/components/post/PostBuy.vue"
import PostSell from "@/components/post/PostSell.vue"
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from 'lodash'
@Component({
    components: {
        PostBuy,
        PostSell
    },
    computed: {}
})

export default class Postx extends Vue {
    tabs: any = 2
    dialog: any = false
    products: any = null
    value: any = []
    labels: any = []
    async created() {
        await this.loadFarm()
        await this.loadProducts()
    }

    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
    }
    data: any = null
    productsEnd: any = null
    
    async loadProducts() {
        this.productsEnd = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}&status=3`)
        this.products = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}`)
        this.data = _.chain(this.products)
            // Group the elements of Array based on `color` property
            .groupBy("status")
            // `key` is group's name (color), `value` is the array of objects
            .map((value: any, key: any) => ({ status: key, data: value }))
            .value()

        for (let index = 0; index < this.data.length; index++) {
            this.value.push(this.data[index].data.length)
            let name = ''
            if (this.data[index].status == 0) {
                name = 'ยกเลิก'
            } else if (this.data[index].status == 1) {
                name = 'ได้รับสินค้าแล้ว'
            } else if (this.data[index].status == 2) {
                name = 'รับซื้อ'
            } else if (this.data[index].status == 3) {
                name = 'ขายแล้ว'
            } else if (this.data[index].status == 4) {
                name = 'สินค้าหมด'
            } else if (this.data[index].status == 5) {
                name = 'มีสินค้า'
            } else {
                name = 'ไม่มีสถานะ'
            }
            this.labels.push(`${name} (${this.data[index].data.length})`)
        }

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

</style>
