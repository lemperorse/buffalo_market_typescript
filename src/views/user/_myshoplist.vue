<template>
<div class="p-2">
    <v-container grid-list-xs>
        <div class="px-1 md:px-10 mx-auto w-full">
            <div>
                <v-row class="pb-6 ">
                    <div>
                        <!-- <pre>{{user}}</pre> -->
                        <div class="pa-2 wrap elevation-0   ">
                            <span class="text-xl"><i class="em em-clipboard p-4" aria-role="presentation" aria-label="CLIPBOARD"></i>{{_lang('รายการของฉัน','My list','我的列表')}}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn @click="$router.push('/user/addpostbuy')" rounded large dark color="teal darken-4"><v-icon>mdi-feather</v-icon>{{$txt.web_nav.post}}</v-btn>
                    </div>

                </v-row>
            </div>
        </div>

        <v-row>
            <v-col cols="12" md="4">
                <v-card class="pa-2 rounded-lg ">
                    <span class="text-xl "> {{_lang('ประเภทประกาศ','Announcement type','公告類型')}}</span>
                    <v-radio class="p-1" label="ทั้งหมด" value="radio-0"></v-radio>
                    <v-radio class="p-1" label="ประกาศซื้อ" value="radio-1"></v-radio>
                    <v-radio class="p-1" label="ประกาศขาย" value="radio-2"></v-radio>
                    <v-divider></v-divider>
                    <span class="text-xl"> {{_lang('สถานะประกาศ','Announcement Status','公告狀態')}}</span> 
                    <v-radio class="p-1" label="ทั้งหมด" value="radio-0"></v-radio>
                    <v-radio class="p-1" label="รับซื้อ" value="radio-1"></v-radio>
                    <v-radio class="p-1" label="ได้รับสินค้าแล้ว" value="radio-2"></v-radio>
                    <v-radio class="p-1" label="มีสินค้า" value="radio-3"></v-radio>
                    <v-radio class="p-1" label="สินค้าหมด" value="radio-4"></v-radio>
                    <v-radio class="p-1" label="ขายแล้ว" value="radio-5"></v-radio>
                    <v-radio class="p-1" label="ยกเลิก" value="radio-6"></v-radio> 
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="8">
                <v-card class=" rounded-lg">
                    <div>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                {{_lang('รูปภาพสินค้า','Product pictures','產品圖片')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ชื่อสินค้า','Product name','產品名稱')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ราคา','Price','價格')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ประเภทสินค้า','Product type','產品類別')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ประเภทประกาศ','Announcement type','公告類型')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('วันที่ลงประกาศ','Date posted','發布日期')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('การจัดการ','Edit','修改')}}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="products" v-for="product,i in products" :key="i">
                                            <td class="pa-2">
                                                <v-img :src="$server+'/'+product.file1" class="h-16 w-16 bg-white rounded-full border"></v-img>
                                            </td>
                                            <td class="pa-2"><span class="">{{product.name}}</span></td>
                                            <td class="pa-2"><span class="  text1" v-if="product.price_type">{{_lang('฿','฿','฿')}} {{product.price}}</span>
                                                <span v-else class=" text1">{{_lang('฿','฿','฿')}} {{product.price_start}} - {{product.price_end}}</span></td>
                                            <!-- <td class="pa-2"><v-select readonly dense rounded :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select></td> -->
                                            <td class="pa-2"><span>{{product.status}}</span></td>
                                            <td class="pa-2"><span>{{product.product_type}}</span></td>
                                            <td class="pa-2"><span>{{product.created_at}}</span></td>
                                            <td class="pa-2">
                                                <v-btn rounded depressed color="info" @click="$router.push(`/user/productdetail?product=${product.id}&name=${product.name}`)"><v-icon>mdi-circle-edit-outline</v-icon>{{_lang('ดู','View','看法')}}</v-btn>
                                                <v-btn rounded depressed color="warning" @click="$router.push(`/user/postselledit/?product=${product.id}`)"><v-icon>mdi-circle-edit-outline</v-icon>{{_lang('แก้ไข','Edit','修改')}}</v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </div>
                </v-card>

                <div class="text-center mt-4">
                    <v-pagination v-model="page" :length="4" circle></v-pagination> 
                </div>

            </v-col>
        </v-row>
    </v-container>
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
            'status': await Product.StatusBuy
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
        this.products = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}&search=${this.search}`)
    }

    public async updateProduct(product: any) {
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) {
            alert("Save product success")
            await this.loadProduct()
        }
    } 

}
</script>

<style>

</style>
