<template>
<div class="bg-gray-100 h-full">
    <v-container grid-list-xs>
        <v-card class="rounded-lg p-2 mt-2 overflow-hidden ">
            <div class="pa-2">
                <v-row wrap>
                    <v-col cols="12" sm="6" md="8">
                        <v-row wrap>
                            <div class="pa-2 ml-5">
                                <v-avatar size="55">
                                    <img :src="$server+'/'+profile.profile_image" />
                                </v-avatar>
                            </div>
                            <div class="ml-2 mt-3">
                                <h3 v-if="product.farm">
                                    <span v-if="product.farm.user">{{_lang('ชื่อ','Name','名稱')}} : {{product.farm.user.first_name}} {{product.farm.user.last_name}}</span>
                                </h3>
                                <div class="text--primary" v-if="product.farm">{{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span> <br /></div>
                                <h3 v-if="product.farm">{{_lang('จังหวัด','Province','省')}} : {{profile.province.name}}-{{profile.amphur.name}}-{{profile.district.name}}</h3>
                                <v-btn @click="openMap" rounded type="submit" class="w-full md:w-1/2 bgbtn" dark><v-icon>mdi-map-marker-radius-outline</v-icon> {{_lang('นำทาง','Navigate','導航')}}</v-btn>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-card>
        <div class="pt-4">
            <span class="text-xl ">รายการประกาศของ {{product.farm.user.first_name}}</span>
        </div>

        <div class="w-full md:w-4/4 ">
            <div class="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-1">
                <div class="w-full p-2 " v-for="(pu,i) in products.results" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <v-hover v-slot:default="{ hover }">
                        <v-card class="p-1 rounded-lg w-full" height="220px" >
                            <v-img class="white--text align-end w-full rounded-t-lg h-28" :src="$server+'/'+pu.file1">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                        <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}} </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-card-text class="">
                                <span class="font-semibold leading-tight mb-1 text-indigo-600 text-sm line2">{{pu.name}}</span>
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
        </div>
        <div class="text-center mt-6 rounded-lg">
            <!-- <v-pagination v-model="page" :length="6" circle color="teal accent-3"></v-pagination> -->
            <v-pagination v-model="page" :length="allPages" :total-visible="9" @input="handlePageChange" circle></v-pagination>
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
import {
    City
} from "@/store/city";
@Component({
    components: { MapView, ProductOther },
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
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/default/farm/${this.product.farm.id}/`)
    }

    async loadProduct() {
        let id = this.$route.query.product
        this.product = await Core.getHttp(`/api/default/products/${id}/`)
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
    background-color: #0ead69;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
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
</style>
