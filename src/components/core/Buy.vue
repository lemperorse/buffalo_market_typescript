<template>
<div class=""> 
    <div class="row p-1">
        <div class="col-md-3 col-sm-3 col-xs-12 ">
            <v-expansion-panels multiple v-model="panel">
                <v-expansion-panel>
                    <v-expansion-panel-header class="bgbtn tw rounded-lg">{{_lang('คลิกเพื่อแสดงตัวกรอง','Click to display the filter','單擊以顯示過濾器。')}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-4 rounded-lg">
                        <p class="bgbtn rounded-full text-white p-3">{{_lang('ประเภทประกาศ','Announcement type','公告類型')}}</p>
                        <v-radio-group class="p-3" v-model="productType">
                            <v-radio v-for="product,n in productsType" :key="n" :label="product.name" :value="product.id"></v-radio>
                        </v-radio-group>
                        <div v-for="category,index in categories" :key="index" class="pb-6">
                            <h2 class="bgbtn rounded-full text-white p-3">{{category.name}}</h2>
                            <v-checkbox class="pl-3 -mb-8" v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                        </div>
                        <p class="bgbtn rounded-full text-white p-3">{{_lang('ระยะเวลาการขาย','Time period','時間段')}}</p>
                        <v-radio-group class="p-3" v-model="priceType">
                            <v-radio v-for="sale,n in saleType" :key="n" :label="sale.name" :value="sale.id"></v-radio>
                        </v-radio-group>
                        <p class="bgbtn rounded-full text-white p-3">{{_lang('ราคา','Price','價錢')}}</p>
                        <div class="flex p-3">
                            <v-text-field v-model="price_low" name="name" id="id" :label="_lang('ต่ำสุด','Lowest','最低的')"></v-text-field> - <v-text-field v-model="price_height" name="name" id="id" :label="_lang('สูงสุด','Maximum','最大')"></v-text-field>
                            <v-btn rounded flat class="mt-2 bgbtn" dark @click="changepriceType" depressed>{{_lang('ค้นหา','Search','搜索')}}</v-btn>
                        </div>
                        <p class="bgbtn rounded-full text-white p-3">{{_lang('จังหวัด','Province','省')}}</p>
                        <v-autocomplete class="p-3" item-text="name" item-value="id" @change="loadProducts()" :label="_lang('จังหวัด','Province','省')" :items="provinces" v-model="province"></v-autocomplete>
                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
        </div> 

        <div class="col-md-9 col-sm-9 col-xs-12 "> 
            <div class="flex flex-row flex-wrap">
                <div class="w-1/2 md:w-1/5 p-2 "  v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <v-hover v-slot:default="{ hover }">
                        <v-card class="rounded-lg" height="220px" width="140px" >
                            <v-img class="white--text align-end w-full rounded-t-lg h-28"   :src="ximg(pu.file1)">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                        <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}} </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-card-text class="">
                                <span class="font-semibold leading-tight mb-1 text-indigo-600 text-sm">{{pu.name}}</span> 
                                <div class="font-bold mb-1">
                                    <span class="text-sm" v-if="pu.price_type">{{_lang('฿','฿','฿')}} {{pu.price}}</span>
                                    <span v-else>{{_lang('฿','฿','฿')}} {{pu.price_start}} - {{pu.price_end}}</span>
                                </div> 
                            </v-card-text>  
                        </v-card>
                    </v-hover>
                </div>
            </div> 

            <div class="text-center mt-6 rounded-lg">
                <v-pagination v-model="page" :length="6" circle color="teal accent-3"></v-pagination>
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
    panel:number[] = [0, 1]  

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
        return (file) ? process.env.VUE_APP_SERVER + '/' + file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
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
 
.bgbtn{
    background-color: #0ead69;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.tw{
    color: white;
} 
</style>
