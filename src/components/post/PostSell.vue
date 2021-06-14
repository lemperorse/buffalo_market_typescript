<template>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <v-row dense>
            <v-col cols="12" sm="8" class="flex flex-wrap">
                <div class="w-1/2"> 
                    <v-text-field @click="loadProduct" filled rounded v-model="search" id="id" :label="_lang('ค้นหา...','What are you looking for?','搜索')"  ></v-text-field>
                </div>
                <hr class="m-1">
                <v-spacer></v-spacer>
                <v-btn type="submit " @click="loadProduct" large fab class="bgbtn" dark>
                    <v-icon dark>fas fa-search</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="12" sm="4" class="relative ">
                <div class="text-right"> 
                    <v-btn type="submit " @click="$router.push(`/user/addpostsell`)" large rounded class="w-full md:w-auto float-md-right bgbtn" dark>
                        <v-icon dark>mdi-plus-circle-outline</v-icon>{{_lang('เพิ่มประกาศ','Add product','添加產品')}}
                    </v-btn>
                </div>
            </v-col>
        </v-row> 
        
        <div class="row p-1">
            <div class="w-1/2 md:w-1/5 cursor-pointer p-3 " v-if="products" v-for="product,i in products" :key="i">
                <v-hover v-slot:default="{ hover }">
                    <v-card class="rounded-lg" height="370px" width="200px">
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
                                <v-btn type="submit " @click="$router.push(`/user/postselledit/?product=${product.id}`)" large rounded class="w-full bgbtn" dark>
                                    <v-icon dark>fas fa-pencil-alt</v-icon>{{_lang('แก้ไข','Edit','編輯公告')}}
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
.bgbtn{
    background-color: #0ead69;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
