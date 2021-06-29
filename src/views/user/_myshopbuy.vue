<template>
<div class="p-2 bg-gray-100 h-full">
    <v-container grid-list-xs>
        <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2">
            <li class="px-2"><a href="/#/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2"><a href="/#/user/myshop/" class="hover:underline">{{_lang('ร้านค้าของฉัน','My shop','我的店鋪')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2 text-green-600">{{_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')}}</li>
        </ol>
        <div class="px-1 pt-8 md:px-10 mx-auto w-full">
            <div>
                <v-row class="pb-6 ">
                    <div> 
                        <div class="pa-2 wrap elevation-0   ">
                            <span class="text-xl"><i class="em em-clipboard p-4" aria-role="presentation" aria-label="CLIPBOARD"></i>{{_lang('ประกาศซื้อของฉัน','My purchase announcement','我的購買公告')}}</span>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <!-- <i class="em em-female-technologist text-xl mr-2" aria-role="presentation" aria-label=""></i> <b>ติดต่อผู้ดูแลระบบ</b> -->
                        <v-btn @click="$router.push('/user/addpostbuy')" rounded large dark color="teal darken-4"><v-icon>mdi-feather</v-icon>{{$txt.web_nav.post}}</v-btn>
                    </div>
                    

                </v-row>
            </div>
        </div>
        <!-- <pre>{{products}}</pre>  -->
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="pa-2 rounded-lg ">
                    <span class="text-xl"> {{_lang('สถานะประกาศ','Announcement Status','公告狀態')}}</span>
                    <v-radio-group >
                        <v-radio label="ทั้งหมด" value="radio-0"></v-radio>
                        <v-radio label="รับซื้อ" value="radio-1"></v-radio>
                        <v-radio label="ได้รับสินค้าแล้ว" value="radio-2"></v-radio>
                        <v-radio label="ยกเลิก" value="radio-3"></v-radio>
                    </v-radio-group>
                </v-card>
            </v-col>
            <v-col class="w-full" cols="12" sm="12" md="8">
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
                                                {{_lang('สถานะประกาศ ','Announcement Status','公告狀態')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ประเภทการซื้อ','Sales type','銷售類型')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('วันที่สิ้นสุดประกาศซื้อ','Sale end date','銷售結束日期')}}
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
                                            <!-- <pre>{{product}}</pre> -->
                                            <td class="pa-2">
                                                <v-img :src="$server+'/'+product.file1" class="h-16 w-16 bg-white rounded-full border"></v-img>
                                            </td>
                                            <td class="pa-2"><span class="">{{product.name}}</span></td>
                                            <td class="pa-2"><span class="  text1" v-if="product.price_type">{{_lang('฿','฿','฿')}} {{product.price}}</span>
                                            <span v-else class=" text1">{{_lang('฿','฿','฿')}} {{product.price_start}} - {{product.price_end}}</span></td>
                                            <!-- <td class="pa-2"><v-select readonly dense rounded :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select></td> -->
                                            <td class="pa-2"><span>{{product.status}}</span></td> 
                                            <td class="pa-2"><span>{{product.sell_type}}</span></td> 
                                            <td class="pa-2"><span>{{product.buy_date}}</span></td> 
                                            <td class="pa-2"><span>{{product.created_at}}</span></td>
                                            <td class="pa-2">
                                                <v-btn rounded depressed color="info" @click="$router.push(`/user/productdetail?product=${product.id}&name=${product.name}`)"><v-icon>mdi-shopping-outline</v-icon>{{_lang('ดู','View','看法')}}</v-btn>
                                                <v-btn rounded depressed color="warning" @click="$router.push(`/user/postbuyedit/?product=${product.id}`)"><v-icon>mdi-circle-edit-outline</v-icon>{{_lang('แก้ไข','Edit','修改')}}</v-btn>
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
import moment from "moment"; 
import {
    City
} from "@/store/city";
@Component({
    components: { MapView },
    computed: {
    },
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
        this.products = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}&product_type=1&search=${this.search}`) 
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

<style scoped>
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
