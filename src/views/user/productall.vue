<template>
<div class="bg-gray-100 h-full">
    <v-container grid-list-xs>
        <div class="w-full"><br>
            <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2 mt-4 items-center">
                <li class="px-2 text-sm"><span @click="$router.push('/')" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</span></li>
                <li class="text-gray-500 select-none">/</li>
                <li class="px-2 text-sm"><span @click="$router.push('/product')" class="hover:underline">{{_lang('ประกาศ ซื้อ-ขาย','Home','家')}}</span></li>
                <li class="text-gray-500 select-none">/</li>
                <li class="px-2 text-sm text-yellow-600"> {{product.farm.name}}</li>
            </ol>
        </div>

        <div class="rounded-lg p-2 mt-6 overflow-hidden bgbg shadow ">
            <div class="pa-2">
                <div class="flex flex-col md:flex-row  items-center md:items-start	">
                    <div class="pa-2 ml-5 ">
                        <v-avatar size="150">
                            <v-img v-if="farm.user_image" :src="$server+'/'+product.farm.user_image" />
                            <v-img v-else src="https://www.ibeargroup.com/booking/assets/images/icon_shop.png" />
                        </v-avatar>
                    </div>
                    <div class="ml-2 mt-3 text-white">
                        <h3 v-if="product.farm">
                            <!-- {{_lang('ชื่อ','Name','名稱')}} : -->
                            <span class="text-xl font-bold"> {{product.farm.name}}</span>
                        </h3>
                        <div class="text-white text-lg " v-if="product.farm">{{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span> <br /></div>
                        <h3 v-if="product.farm" class="text-lg text-white">
                            <span>{{_lang('ที่อยู่','Address','地址')}} :{{product.farm.farm_address}}</span>
                        </h3>
                        <h3 class="text-lg" v-if="product.farm">{{_lang('จังหวัด','Province','省')}} : {{profile.province.name}} {{profile.amphur.name}} {{profile.district.name}}</h3>
                        <h3 class="text-lg" v-if="product.farm">{{_lang('รหัสไปรษณีย์','Postal code','郵政編碼')}} : {{profile.zipcode}}</h3>
                        <div class="mt-2 ">
                            <v-btn large @click="openMap()" outlined rounded type="submit" class="w-full" dark>
                                <v-icon>mdi-map-marker-radius-outline</v-icon> {{_lang('นำทางไปสู่เจ้าของร้านค้า','Navigate','導航')}}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="pt-8">
            <span class="text-2xl font-bold">รายการประกาศของ <span class="text-2xl text-yellow-600">{{farm.user.first_name}} {{farm.user.last_name}}</span> </span>
        </div>

        <div class="w-full md:w-4/4 pt-6">
            <!-- <div class="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 gap-1">
                <div class="" v-for="(pu,i) in products.results" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <le-card :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" :image="ximg(pu.file1)" :name="pu.name" :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" :time="pu.created_at" />
                </div>
            </div> -->
            <div :class="`grid grid-cols-2 ${(advanceSearch)?'lg:grid-cols-6':'lg:grid-cols-7'}  md:grid-cols-4 sm:grid-cols-3 gap-1`">
                         <le-card   v-for="(pu,i) in products.results" :key="i"  classProp="w-full"
                                :path="`/user/productdetail?product=${pu.id}&name=${pu.name}`" 
                                :image="ximg(pu.file1)"
                                :name="pu.name" 
                                :price="(pu.price_type)?pu.price:`${pu.price_start} - ${pu.price_end}`" 
                                :time="pu.created_at"
                                /> 
                </div>
            <br>
        </div>
        <div class="text-center mt-4 mb-6 rounded-lg">
            <!-- <v-pagination v-model="page" :length="6" circle color="teal accent-3"></v-pagination> -->
            <v-pagination color="orange" v-model="page" :length="allPages" :total-visible="9" @input="handlePageChange" circle></v-pagination>
        </div>

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
import ProductOther from '@/components/core/ProductOther.vue'
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Map } from "@/store/map";
import { Product } from "@/store/product";
import Card from '@/components/cart/Card.vue'
import {
    City
} from "@/store/city";
@Component({
    components: { MapView, ProductOther, Card },
    computed: {},
})

export default class PostSaller extends Vue {
    dialog: boolean = false
    async created() {
        await this.loadProduct();
        await this.loadFarm();
        await this.loadProducts()
        this.response = true
    }
    products: any = null
    product: any = null
    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null

    allPages: number = 1
    page: number = 1

    async loadFarm() {
        //   this.user = await Auth.getUser()
        // this.profile = await User.getProfileFull();
        // this.farm = await Core.getHttp(`/api/default/farm/${this.product.farm.id}/`)
        // console.log(this.farm )
    }

    async loadProduct() {
        let id = this.$route.query.product
        this.product = await Core.getHttp(`/api/default/products/${id}/`)
        this.farm = this.product.farm
        this.profile = this.product.farm
        console.log(this.product)
    }
    async loadProducts() {
        let search = this.$route.query.search
        search = (search) ? `search=${search}` : ''
        this.products = await Core.getHttp(`/api/default/products/?&product_type=${search}`)
        this.allPages = Math.ceil((this.products.count / 16))

    }
    // async loadProducts() {
    //     this.products = await Core.getHttp(`/api/default/products/?farm=${this.product.farm.id}`)
    // }
    public async updateProduct(product: any) {
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) {
            alert("Save product success")
            await this.loadProduct()
        }
    }

    private async handlePageChange(value: any) {
        let search = this.$route.query.search
        search = (search) ? `search=${search}` : ''
        this.products = await Core.getHttp(`/api/default/products/?&product_type=${search}&page=${value}`)

    }

    async openBrowser(position: any) {
        let me = `${position.coords.latitude},${position.coords.longitude}`
        let to = `${this.farm.latitude},${this.farm.longitude}`
        console.log(me, `https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`);
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`, '_blank');
    }
    async openMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.openBrowser);
        } else {

        }

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

.bg-nav {
    background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.line2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.bgbg {
    background-color: #ee5522;
}

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
