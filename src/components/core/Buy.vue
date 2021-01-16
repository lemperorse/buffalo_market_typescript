<template>
<div>
    <ul class="breadcrumb mt-8 mb-4 rounded">
        <li><a href="/#/user/home/">หน้าแรก</a></li>
        <li>ประกาศซื้อ</li>
    </ul>

    <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
            <v-card>
                <v-card-title>
                    กรอง
                </v-card-title>
                <v-radio-group v-model="productType">
                    <v-radio v-for="product,n in productsType" :key="n" :label="product.name" :value="product.id"></v-radio>
                </v-radio-group>
                <v-divider></v-divider>
                <div v-for="category,index in categories" :key="index">
                    <h2>{{category.name}}</h2>
                    <v-checkbox v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                </div>

                <v-card-title>ราคา</v-card-title>
                <v-radio-group v-model="priceType">
                    <v-radio v-for="sale,n in saleType" :key="n" :label="sale.name" :value="sale.id"></v-radio>
                </v-radio-group>
                <div class="flex ">
                    <v-text-field v-model="price_low" name="name" label="ต่ำสุด" id="id"></v-text-field> - <v-text-field v-model="price_height" name="name" label="สูงสุด" id="id"></v-text-field>
                    <v-btn @click="changepriceType" color="success">{{_lang('ตกลง','OK','好')}}</v-btn>
                </div>

                <v-divider></v-divider>

                <v-autocomplete item-text="name" item-value="id" @change="loadProducts()" label="จังหวัด" :items="provinces" v-model="province"></v-autocomplete>

            </v-card>
        </div>

        <div class="col-md-9 col-sm-9 col-xs-12">
            <v-divider></v-divider>

            <!-- <Product /> -->
            <div class="row">
                <div class="w-40 m-2 cursor-pointer" v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">

                    <v-hover v-slot:default="{ hover }">
                        <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                            <v-img class="white--text align-end w-full"  height="150px" :src="ximg(pu.file1)" >
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                        <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>ดูรายละเอียด </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <div class="p-6 ">
                                <div class="flex items-baseline mb-1">
                                    <span class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">ใหม่</span>
                                    <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide" v-for="cat,i in pu.category" :key="i">
                                        {{cat.name}}
                                    </div>
                                </div>
                                <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 "> {{pu.name}}</h4>

                                <div class=" text-orange-600 font-bold mb-1">
                                    <span v-if="pu.price_type">{{pu.price}}</span>
                                    <span v-else>{{pu.price_start}} - {{pu.price_end}}</span>
                                </div>
                                <div class="text-sm text-gray-600 font-light mb-1" v-if="pu.farm">
                                    <span class="fas fa-map-marker-alt"></span>
                                    <span v-if="pu.farm.province">{{pu.farm.province.name}}</span>
                                </div>
                            </div>
                            <hr>
                            <div class="text-xs text-center">
                                <span class="fas fa-bullhorn"></span> ผู้โพส : <span v-if="pu.farm.user">{{pu.farm.user.first_name}}</span>
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

/* Style the list */
ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
}

/* Display list items side by side */
ul.breadcrumb li {
    display: inline;
    font-size: 18px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}
</style>
