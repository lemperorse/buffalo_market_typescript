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
                        <div class="mx-auto rounded-lg  bg-white hover:shadow-lg overflow-hidden shadow-lg border">
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
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
    border-radius: 10px; 
}
</style>
