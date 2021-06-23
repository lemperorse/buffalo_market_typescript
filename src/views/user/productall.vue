<template>
<div>
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
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-3">
                <div class="w-full p-2 " v-for="(pu,i) in products.results" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                    <v-hover v-slot:default="{ hover }">
                        <v-card class="rounded-lg w-full" height="220px">
                            <v-img class="white--text align-end w-full rounded-t-lg h-28" :src="$server+'/'+pu.file1">
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
        this.allPages = Math.ceil((this.products.count / 24))

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
</style>
