<template>
<div class="mt-8 md:w-10/12 w-full">
    <v-row justify="center">
        <v-col cols="12" sm="12">
            <v-toolbar color="transparent" flat class="justify-center items-center"> 
                <!-- <p class="font-weight-light text-center text-xl text-purple-600">
                    สินค้าที่คุณอาจสนใจ
                </p> -->
                <v-toolbar-title class="" >สินค้าที่คุณอาจสนใจ</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn rounded @click="$router.push('/product?type=2')" color="orange accent-4" outlined>
                    <v-icon class="pr-2">mdi-shopping</v-icon> {{_lang('ดูทั้งหมด','All','查看全部')}}
                </v-btn>
            </v-toolbar>
            <v-slide-group multiple show-arrows><br>
                <v-slide-item v-for="pu,i in products" :key="i"  > 
                    <div class="flex flex-row w-full">
                        <div class="w-1/2 md:w-1/5 p-2 "    >
                            <le-card :time="pu.created_at" :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" :image="ximg(pu.file1)" :name="pu.name" :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" class="h-37 w-48" />
                        </div>
                    </div>
                </v-slide-item>
            </v-slide-group>
         
        </v-col>
    </v-row>
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
import _ from 'lodash'
@Component({
    components: { Card },
    computed: {},
})

export default class PostSaller extends Vue {

    products: any = null
    async created() {
        let products  = await Core.getHttp(`/api/default/products/`)

       this.products =  _.shuffle(products.results);
       this.products.length = Math.min(this.products.length, 10);

        

    }

    ximg(file: any) {
        return (file) ? process.env.VUE_APP_SERVER + '/' + file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }

}
</script>

<style>

</style>
