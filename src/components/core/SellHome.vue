<template>
<div class="pt-6">
    <div class="flex flex-col md:flex-row">
         
        <div class="w-full  md:pl-6 animate__animated  animate__bounceInRight">
            <div class="w-full p-6">
                <v-toolbar color="transparent" flat>
                    <div class="flex items-center h-auto">
                        <div class="">
                            <h2 class="text-xl md:text-2xl font-bold"> {{_lang('ประกาศ ขาย','Sell announcement','出售公告')}}</h2>
                            <h2 class="text-md md:text-xl font-bold text-red-500"> {{_lang('หากคุณต้องการซื้อสินค้า','If you want to buy','如果你想买')}}</h2>
                        </div>
                    </div>
                    <v-spacer></v-spacer> 
                    <v-btn color="orange" dark rounded large outlined @click="$router.push('/ProductSell')">ดูสินค้าทั้งหมด</v-btn>
                </v-toolbar>
            </div>
            <br>
            <div class="w-full p-6" v-if="($route.query.search) && ($route.query.search != '')">
                <h2 class="text-xl ">
                    &nbsp;
                    <span class="text-2xl font-bold">ผลการค้นหา</span> {{$route.query.search}}</h2><br>
                <v-btn small @click="resetPage()" rounded color="orange" outlined class="text-yellow-600">{{_lang('ล้างการค้นหา','Clean up','清理')}}</v-btn>

            </div>
            <div class="grid grid-cols-2 lg:grid-cols-6  md:grid-cols-4 sm:grid-cols-3 gap-1">
                <le-card v-for="(pu,i) in products.results" :key="i" classProp="w-full" :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" :image="ximg(pu.file1)" :name="pu.name" :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" :time="pu.created_at" />
            </div>
            <br>
            <v-pagination color="orange darken-4" v-model="page" :length="allPages" :total-visible="9" @input="handlePageChange" circle></v-pagination>
            <br>
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
import _ from 'lodash'
@Component({
    components: { MapView },
    computed: {},
})

export default class PostSaller extends Vue {

    advanceSearch: boolean = true
    width: any = this.$vuetify.breakpoint.width

    dialog: boolean = false
    priceType: any = 1
    saleType: any = null
    page: number = 1
    panel: number[] = [0, 1]
    allPages: number = 1
    async created() {
        // await Core.switchLoad(true)
        await this.run()
        // await Core.switchLoad(false)
    }

    products: any = null
    response: boolean = false;
    category: any = ''
    productType: number = 0
    productsType: any = null

    async run() {
        // await Core.switchLoad(true)
        await this.loadCategory();
        await this.loadProvinces();
        this.saleType = await Product.SaleType
        this.productsType = await Product.ProductType
        await this.loadProducts()
        await this.getType();
        await this.getCat();
        // await Core.switchLoad(false)
        this.response = true
    }

    @Watch('chooseCategories')
    async changeCategory(val: any) {
        this.category = `category=${this.chooseCategories.toString()}`
        await this.loadProducts()
    }

    @Watch('productType')
    async changeProductsType(val: any) {
        await this.loadProducts()
    }

    async getType() {
        let typeProduct: any = this.$route.query.type;
        if (typeProduct) {
            let choose = _.find(this.productsType, { name: typeProduct })
            this.productType = choose.id;
        }
    }

    async getCat() {
        let typeProduct: any = this.$route.query.cat;
        if (typeProduct) {
            let choose = _.find(this.categories, { id: Number(typeProduct) })
            this.chooseCategories = _.map(choose.detail, (val: any) => { return val.id })

        }
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
        // this.allPages = Math.ceil((this.products.count / 9))
        this.allPages = Math.ceil((this.products.count / this.products.result.length))

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

    private async resetPage() {
        this.$router.push('/product?search=')
        await location.reload();
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

/* .text-yellow-600 {
    background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
} */

.tw {
    color: white;
}
</style>
