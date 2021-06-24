<template>
<div class="p-2 bg-gray-100 h-full">
    <v-container grid-list-xs>
        <div class="px-1 md:px-10 mx-auto w-full">
            <div>
                <v-row class="pb-6 ">
                    <div>
                        <!-- <pre>{{user}}</pre> -->
                        <div class="pa-2 wrap elevation-0   ">
                            <span class="text-xl"><i class="em em-card_file_box p-4" aria-role="presentation" aria-label=""></i>{{_lang('รายงานของฉัน','My report','我的報告')}}</span>
                        </div>
                    </div>

                </v-row>
                <div class="">
                    <!-- <pre>{{data}}</pre> -->
                    <v-card class=""> 
                        <v-sheet color="" class="rounded-lg">
                            <v-icon class="p-4" size="48" color="indigo">
                                mdi-shopping-outline
                            </v-icon>
                            <v-sparkline :labels="labels" :value="value" color="teal darken-1" height="100" padding="30" stroke-linecap="round" smooth>

                            </v-sparkline>
                        </v-sheet>
                    </v-card>
                </div>
            </div>
        </div>
    </v-container>
</div>
</template>

<script lang="ts">
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Component, Vue, Watch } from "vue-property-decorator";
import _ from 'lodash'
@Component({
    components: {},
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

<style>

</style>
