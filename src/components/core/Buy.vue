<template>
<div>
    <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12 ">
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                    <v-expansion-panel-header class="bgtext1 shadow ">{{_lang('คลิกเพื่อแสดงตัวกรอง','Click to display the filter','單擊以顯示過濾器。')}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="bg3 pt-4">
                        <p class="bgtext rounded shadow-lg p-3">{{_lang('ประเภทประกาศ','Announcement type','公告類型')}}</p>
                        <v-radio-group class="p-3" v-model="productType">
                            <v-radio v-for="product,n in productsType" :key="n" :label="product.name" :value="product.id"></v-radio>
                        </v-radio-group>
                        <div v-for="category,index in categories" :key="index">
                            <h2 class="p-3 bgtext rounded shadow-lg">{{category.name}}</h2>
                            <v-checkbox class="pl-3" v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                        </div>
                        <p class="bgtext rounded shadow-lg p-3">{{_lang('ระยะเวลาการขาย','Time period','時間段')}}</p>
                        <v-radio-group class="p-3" v-model="priceType">
                            <v-radio v-for="sale,n in saleType" :key="n" :label="sale.name" :value="sale.id"></v-radio>
                        </v-radio-group>
                        <p class="bgtext rounded shadow-lg p-3">{{_lang('ราคา','Price','價錢')}}</p>
                        <div class="flex p-3">
                            <v-text-field v-model="price_low" name="name" id="id" :label="_lang('ต่ำสุด','Lowest','最低的')"></v-text-field> - <v-text-field v-model="price_height" name="name" id="id" :label="_lang('สูงสุด','Maximum','最大')"></v-text-field>
                            <v-btn rounded flat class="mt-2" @click="changepriceType" color="success" depressed>{{_lang('ตกลง','OK','好')}}</v-btn>
                        </div>
                        <p class="bgtext rounded shadow-lg p-3">{{_lang('จังหวัด','Province','省')}}</p>
                        <v-autocomplete class="p-3" item-text="name" item-value="id" @change="loadProducts()" :label="_lang('จังหวัด','Province','省')" :items="provinces" v-model="province"></v-autocomplete>
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
            <!-- <v-card class="elevation-0">
                </v-card> -->
        </div>

        <div class="col-md-9 col-sm-9 col-xs-12">
            <!-- <Product /> -->
            <div class="row">
                <div class="w-36 m-2 md:mr-6 cursor-pointer " v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <v-hover v-slot:default="{ hover }">
                        <div class="mx-auto rounded-lg  bg-white overflow-hidden shadow-lg border">
                            <v-img class="white--text align-end w-full rounded-t-lg" height="150px" :src="ximg(pu.file1)">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                        <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}} </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <div class="p-6 ">
                                <div class="flex items-baseline mb-1">
                                    <span class="inline-block bg-blue-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">{{_lang('ประเภท','Category','類別')}}</span>
                                    <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                        {{pu.product_type}}
                                    </div>
                                </div>

                                <h4 class="font-semibold leading-tight text-sm mb-1 text-indigo-600 "> {{_lang('ชื่อสินค้า','Product','產品名稱')}} : {{pu.name}}</h4>

                                <div class="text-orange-600 font-bold mb-1">
                                    <span class="text-sm" v-if="pu.price_type">{{_lang('ราคา','Price','價錢')}} : {{pu.price}}</span>
                                    <span v-else>{{pu.price_start}} - {{pu.price_end}}</span>
                                </div>
                                <div class="text-sm text-gray-600 font-light mb-1" v-if="pu.farm">
                                    <span class="fas fa-map-marker-alt text-xs"></span>
                                    <span class="text-xs" v-if="pu.farm.province">{{pu.farm.province.name}}</span>
                                </div>
                            </div>
                            <!-- <div class="flex flex-wrap items-baseline text-xs text-center pl-6">
                                <span class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">tag</span>
                                <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide" v-for="cat,i in pu.category" :key="i">
                                    {{cat.name}}
                                </div>
                            </div> -->
                            <hr>
                            <div class="text-xs text-center bg1">
                                <span class="fas fa-bullhorn tw"></span> <span class="tw">{{_lang('ผู้โพส','Poster','海報')}} : </span><span v-if="pu.farm.user" class="tw">{{pu.farm.user.first_name}}</span>
                            </div>
                        </div>
                    </v-hover>
                </div>
            </div>

            <div class="text-center mt-6">
                <v-pagination v-model="page" :length="6" circle></v-pagination>
            </div>
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
    dialog: boolean = false
    priceType: any = 1
    saleType: any = null
    page: number = 1
    // panel:number[] = [0, 1]  

    async created() {
        await this.loadCategory();
        await this.loadProvinces();
        this.saleType = await Product.SaleType
        this.productsType = await Product.ProductType
        await this.loadProducts()
        this.response = true
    }
    products: any = null
    response: boolean = false;
    category: any = ''
    productType: number = 0
    productsType: any = null
    @Watch('chooseCategories')
    async changeCategory(val: any) {
        this.category = `category=${this.chooseCategories.toString()}`
        await this.loadProducts()
    }

    @Watch('productType')
    async changeProductsType(val: any) {
        await this.loadProducts()
    }

    price: any = ''
    price_low: any = ''
    price_height: any = ''
    async changepriceType() {
        if (this.priceType == true) {
            this.price = `&price_in=${Number(this.price_low)-1}&price_out=${Number(this.price_height)+1}`
        } else {
            this.price = `&price_start=${Number(this.price_low)-1}&price_end=${Number(this.price_height)+1}`
        }
        await this.loadProducts()
    }

    async loadProducts() {
        let search = this.$route.query.search
        search = (search) ? `search=${search}` : ''
        this.products = await Core.getHttp(`/api/default/products/?&product_type=${this.productType}&${this.category}${search}${this.price}&farm__province=${this.province}`)
    }
    categories: any = null
    chooseCategories: any = []
    async loadCategory() {
        this.categories = await Core.getHttp(`/api/default/categories/`)
    }
    provinces: any = null
    province: any = '';
    async loadProvinces() {
        this.provinces = await Core.getHttp(`/api/default/province/`)
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

.bg1 {
    background-color: #0EAD69;
}

.tw {
    color: white;
}

.bgtext {
    background: linear-gradient(to right, #0DB39E 0%, #16DB93 100%);
    color: white;
}

.bgtext1 {
    /* background: linear-gradient(to right, #83E377 0%, #EFEA5A 100%); */
    background: linear-gradient(to right, #0DB39E 0%, #16DB93 100%);
    color: white;
}

.bg3 {
/* background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23edf6f9'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%238e9aaf'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover; */
}
</style>
