<template>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <v-row dense>
            <v-col cols="12" sm="8" class="flex flex-wrap">
                <div class="w-full md:w-1/2"> 
                    <v-text-field @click="loadProduct" filled rounded v-model="search" id="id" :label="_lang('ค้นหา...','What are you looking for?','搜索')"  ></v-text-field>
                </div>
                <hr class="m-1">
                <v-btn type="submit " @click="loadProduct" large fab class="w-full" color="success">
                    <v-icon dark>fas fa-search</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="12" sm="4" class="relative ">
                <div class="text-right"> 
                    <v-btn type="submit " @click="$router.push(`/user/addpostsell`)" large rounded class="w-full md:w-auto float-md-right" color="success">
                        <v-icon dark>far fa-plus-square</v-icon>{{_lang('เพิ่มประกาศขาย','Add product','添加產品')}}
                    </v-btn>
                </div>
            </v-col>
        </v-row> 
        
        <div class="row p-1">
            <div class="w-1/2 md:w-1/5 cursor-pointer p-2 " v-if="products" v-for="product,i in products" :key="i">
                <v-hover v-slot:default="{ hover }">
                    <v-card class="rounded-lg" outlined>
                        <v-img class="white--text align-end w-full rounded-t-lg" height="150px" :src="$server+'/'+product.file1">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${product.id}&name=${product.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}}</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-4">
                            <h4 class="font-semibold leading-tight mb-1 text-indigo-600 text1">{{product.name}}</h4>
                            <div class=" text-orange-600 font-bold mb-1">
                                <span class="  text1" v-if="product.price_type">{{_lang('฿','฿','฿')}} {{product.price}}</span>
                                <span v-else class=" text1">{{_lang('฿','฿','฿')}} {{product.price_start}} - {{product.price_end}}</span>
                            </div>
                            <v-select dense rounded @change="updateProduct(product)" :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('สถานะสินค้า ','Product status','產品狀態')"></v-select>
                            <div class=" flex "> 
                                <v-btn type="submit " @click="$router.push(`/user/postselledit/?product=${product.id}`)" large rounded class="w-full" color="success">
                                    <v-icon dark>fas fa-pencil-alt</v-icon>{{_lang('แก้ไขประกาศ','Edit','編輯公告')}}
                                </v-btn>
                            </div>
                        </div>
                    </v-card>
                </v-hover>
            </div>
        </div>

        <div class="text-center mt-6">
            <v-pagination v-model="page" :length="6" circle></v-pagination>
        </div>

    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import MapView from '@/components/core/Map.vue';
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Map } from "@/store/map";
import { Product } from "@/store/product";
import {
    City
} from "@/store/city";
@Component({
    components: { MapView },
    computed: {},
})

export default class PostSaller extends Vue {

    choices: any = {}
    page: number = 1
    status: any = ['มีสินค้า', 'สินค้าหมด', 'ขายแล้ว', 'ยกเลิก']
    search: any = ''
    headers: any = [
        { text: '', value: 'id' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
    ]

    async created() {
        await this.loadFarm();
        await this.loadProduct();
        this.choices = {
            'status': await Product.StatusSell
        }
        this.response = true
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

    products: any = null
    async loadProduct() {
        this.products = await Core.getHttp(`/api/default/products/?farm=${this.farm.id}&product_type=0&search=${this.search}`)
    }

    public async updateProduct(product: any) {
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) {
            alert("Save product success")
            await this.loadProduct()
        }
    }

    ximg(file: any) {
        return (file) ? file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }

}
</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
}
.text1 {
    font-size: 12px; 
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;}
</style>
