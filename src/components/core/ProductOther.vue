<template>
<div>
    <v-card-text class="pa-0 pt-4" tile outlined>
        <div class="row ">
            <div class="w-36 m-2 cursor-pointer" v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                <v-hover v-slot:default="{ hover }">
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden shadow-lg border">
                        <v-img class="white--text align-end w-full" height="150px" :src="ximg(pu.file1)">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>ดูรายละเอียด </v-btn>
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

                        <hr>
                        <div class="text-xs text-center bg1">
                            <span class="fas fa-bullhorn tw"></span> <span class="tw">{{_lang('ผู้โพส','Poster','海報')}} : </span><span v-if="pu.farm.user" class="tw">{{pu.farm.user.first_name}}</span>
                        </div>
                    </div>
                </v-hover>
            </div>
        </div>
    </v-card-text>
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
        this.products = await Core.getHttp(`/api/default/products/?farm=${this.product.farm.id}`)
    }
    public async updateProduct(product: any) {
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) {
            alert("Save product success")
            await this.loadProduct()
        }
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

.bg1 {
    background-color: #0EAD69;
}

.tw {
    color: white;
}

</style>
