<template>
<div class=" md:p-10">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="12">
                <v-toolbar color="transparent" flat>
                    <h2 class="font-bold text-xl  ">
                        <v-icon>mdi-bullhorn-outline</v-icon> {{_lang('ประกาศซื้อล่าสุด','Latest Purchase ','最新采购公告')}}
                    </h2>
                    <v-spacer></v-spacer>
                    <v-btn rounded @click="$router.push('/product?type=2')" outlined color="teal darken-3">
                        <v-icon class="pr-2">mdi-shopping</v-icon> {{_lang('ดูทั้งหมด','All','查看全部')}}
                    </v-btn>
                </v-toolbar>
                <v-slide-group multiple show-arrows><br>
                    <v-slide-item v-for="n in 25" :key="n">
                        <div class="flex flex-row w-full">
                            <div class="w-1/2 md:w-1/5 p-2 " v-for="pu,i in products.results" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                                <Card :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" :img="ximg(pu.file1)" :name="pu.name" :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" class="h-37 w-48 p-1 rounded-lg " />
                            </div>
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script lang="ts">
import Card from '@/components/cart/Card.vue'
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import {
    Core
} from "@/store/core";
import {
    Product
} from "@/store/product";
import {
    City
} from "@/store/city";
@Component({
    components: { Card },
    computed: {},
})

export default class PostSaller extends Vue {

    products: any = null
    async created() {
        this.products = await Core.getHttp(`/api/default/products/`)

    }

    ximg(file: any) {
        return (file) ? process.env.VUE_APP_SERVER + '/' + file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }

}
</script>

<style>
.line1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
