<template>
<div class="bg-sell md:p-10">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="12">
                <v-toolbar color="transparent" flat>
                    <h2 class="font-bold text-2xl  ">
                        <v-icon>mdi-bullhorn-outline</v-icon> {{_lang('ประกาศขายล่าสุด','Latest Sale','最新销售')}}
                    </h2>
                    <v-spacer></v-spacer>
                    <v-btn rounded @click="$router.push('/product?type=ขาย')" outlined color="orange accent-4">
                        <v-icon class="pr-2">mdi-shopping</v-icon> {{_lang('ดูทั้งหมด','All','查看全部')}}
                    </v-btn>
                </v-toolbar>
                <v-slide-group multiple show-arrows><br>
                    <v-slide-item  v-for="pu,i in products" :key="i" >
                        <div class="flex flex-row w-full"> 
                            <div class="w-1/2 md:w-1/5 p-2 "  @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                                <!-- <Card :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" :img="ximg(pu.file1)"  class="h-37 w-48 p-1 rounded-lg" /> -->
                                <le-card  
                                :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" 
                                :image="ximg(pu.file1)"
                                :name="pu.name" 
                                :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" 
                                :time="pu.created_at"
                                /> 
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
import _ from 'lodash'
@Component({
    components: { Card },
    computed: {},
})

export default class PostSaller extends Vue {

    products: any = null
    async created() {
        let products = await Core.getHttp(`/api/default/products/?product_type=0`)
        this.products = products.results
        this.products.length = Math.min(this.products.length, 10);
    }

 

    ximg(file:any) {
        return (file)?process.env.VUE_APP_SERVER + '/' + file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }

}
</script>

<style>
.bg-sell {
  background-color: #f5ddd0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23f5ddd0' stroke-width='0.22' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cuse fill='%23f0d9cc' href='%23s' y='2'/%3E%3Cuse fill='%23f0d9cc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23ebd4c8' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23ebd4c8' href='%23s'/%3E%3Cuse fill='%23e6d0c4' href='%23s' x='2'/%3E%3Cuse fill='%23e6d0c4' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23e1cbbf'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23e1cbbf'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23dcc7bb'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23f5ddd0'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23d8c2b7'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(230 1000 750) scale(60.45) translate(-983.46 -737.59)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
}
</style>
