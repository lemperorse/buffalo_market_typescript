<template>
<div class="p-6">

    <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/4 p-2">
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
        <div class="w-full md:w-3/4 p-2">
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div class="w-full p-2 " v-for="pu,i in products.results" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <v-hover v-slot:default="{ hover }">
                        <v-card class="rounded-lg w-full" height="220px"  >
                            <v-img class="white--text align-end w-full rounded-t-lg h-28" :src="ximg(pu.file1)">
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
            <br>
            <v-pagination v-model="page" :length="allPages" :total-visible="9" @input="handlePageChange" circle></v-pagination>
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
    panel: number[] = [0, 1]
    allPages: number = 1
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
        this.allPages = Math.ceil((this.products.count / 9))

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

    private async handlePageChange(value: any) {
        let search = this.$route.query.search
        search = (search) ? `search=${search}` : ''
        this.products = await Core.getHttp(`/api/default/products/?&product_type=${this.productType}&${this.category}${search}${this.price}&farm__province=${this.province}&page=${value}`)

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

.bgbtn {
      background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.tw {
    color: white;
}
</style>
