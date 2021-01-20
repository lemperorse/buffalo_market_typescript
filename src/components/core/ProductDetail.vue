<template>
<div>
    <div class="w-full md:w-1/1 xl:w-1/1 p-3 md:p-3 ">
        <div class="row bg-white rounded border hover:shadow-lg overflow-hidden">
            <div class="col-md-5 col-sm-5 col-xs-12">

                <v-carousel class="rounded">
                    <v-carousel-item>
                        <img :src="product.file1" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item>
                        <img :src="product.file2" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item>
                        <img :src="product.file3" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item>
                        <video class="w-full h-full" controls>
                            <source :src="product.file4" type="video/mp4">
                            <source :src="product.file4" type="video/ogg">
                        </video>
                    </v-carousel-item>
                    <v-carousel-item>
                        <video class="w-full h-full" controls>
                            <source :src="product.file5" type="video/mp4">
                            <source :src="product.file5" type="video/ogg">
                        </video>
                    </v-carousel-item>
                </v-carousel>

            </div>
            <div class="col-md-7 col-sm-7 col-xs-12"> 
                <div class="pl-6">
                    <p class="text-2xl mb-0 mt-2 font-bold">{{_lang('ชื่อสินค้า','Product name','產品名稱')}} : {{product.name}}</p>
                    <v-card-actions class="pa-0">
                        <p class="headline font-weight-light pt-3 ">
                            <span v-if="product.price_type">{{_lang('ราคา','Price','價錢')}} : {{product.price}}</span>
                            <span v-else>{{product.price_start}} - {{product.price_end}}</span>
                            <!-- <del style="" class="subtitle-1 font-weight-thin">฿20,000</del> -->
                        </p>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <p class="text-xl font-bold mt-4 m-1">{{_lang('ประเภทสินค้า','Product Type','產品類別')}}</p>
                    <!-- <v-btn class="" v-for="category,i in product.category" :key="i" small color="info" rounded>{{category.name}}</v-btn> -->
                    <v-chip v-for="category,i in product.category" :key="i" class="m-1 rounded-lg" color="orange lighten-1" label text-color="white">
                        <v-icon left>
                            mdi-label
                        </v-icon>
                        {{category.name}}
                    </v-chip>
                </div>

            </div>
        </div>
    </div>

    <div class="bg-white rounded p-2 border hover:shadow-lg overflow-hidden">
        <div class="pa-2 pt-">
            <v-row wrap>
                <v-col cols="12" sm="6" md="8">
                    <v-row wrap>
                        <div class="pa-2 ml-5">
                            <v-avatar size="55">
                                <img src="https://cache.gmo2.sistacafe.com/images/uploads/summary/image/65745/9738ebc7fc580672cfc0053c43d9ad2e.jpg" />
                            </v-avatar>
                        </div>

                        <div class="ml-2 mt-3">
                            <h3 v-if="product.farm">
                                <span v-if="product.farm.user">{{_lang('ชื่อ','Name','名稱')}} : {{product.farm.user.first_name}} {{product.farm.user.last_name}}</span>
                            </h3>
                            <h3 v-if="product.farm">{{_lang('จังหวัด','Province','省')}} : <span v-if="product.farm.province">{{product.farm.province.name}}</span></h3>
                            <div class="flex ">
                                <!-- <button @click="$router.push(`/user/sellerdetail`)" class="text-sm rounded p-2 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                    <div class="text-white"> แสดงรายละเอียด</div>
                                </button> -->
                            </div>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="6" md="4">
                    <div class="ml-5">
                        <div class="text--primary" v-if="product.farm">{{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span> <br /></div>
                        <div class="flex ">
                            <!-- <button @click="dialog = true" class="w-full md:w-1/2 p-1 rounded bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" type="submit">
                                <div class="text-white">นำทาง</div>
                            </button> -->
                            <button @click="openMap" class="w-full md:w-1/2 text-sm rounded p-2 bg-blue-500 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                <div class="text-white">{{_lang('นำทาง','Navigate','導航')}}</div>
                            </button>
                        </div>

                        <!-- <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
                            <v-card>
                                <v-card-title primary-title>
                                    นำทาง <v-spacer></v-spacer>
                                    <v-btn dark icon color="red">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>
                                <v-card>
                                    <v-card-text>
                                        <img src="https://www.img.in.th/images/759e9362e5014422ea9fa2deaf85ce15.png" class="w-full h-auto md:h-full" alt="" />
                                        <p class="text-xl pt-6">
                                            {{product.farm.address}}
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-card>
                        </v-dialog> -->
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

    <div class="w-full md:w-1/1 xl:w-1/1 p-3 md:p-3 mb-2">
        <div class="row bg-white rounded p-2 border hover:shadow-lg overflow-hidden">
            <div class="col-sm-12 col-xs-12 col-md-12">
                <v-tabs class="rounded" color="error" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                    <v-tab>{{_lang('รายละเอียด','Detail','詳情')}}</v-tab>
                    <v-tab>{{_lang('ช่องทางการติดต่ออื่นๆ','Other contact','其他聯絡人')}}</v-tab>
                    <v-tab-item>

                        <p class="pt-4 font-weight-thin text-lg">
                            {{product.detail}}
                        </p>
                    </v-tab-item>
                    <v-tab-item>
                        <p class="pt-4 font-weight-thin text-lg">
                            Email : <span>{{product.farm.email}}</span>
                        </p>
                        <p class="font-weight-thin text-lg">Facebook : <span>{{product.farm.facebook}}</span></p>
                        <p class="font-weight-thin text-lg">Line : <span>{{product.farm.line}}</span></p>
                        <p class="font-weight-thin text-lg">{{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span></p>
                        <p class="font-weight-thin text-lg">
                            {{_lang('ที่อยู่','Address','地址')}} : <span>{{product.farm.address}}</span>
                            <span>{{product.farm.province.name}}</span>-
                            <span>{{product.farm.amphur.name}}</span>-
                            <span>{{product.farm.district.name}}</span>
                            <span>{{product.farm.zipcode}}</span>
                        </p>
                    </v-tab-item>
                </v-tabs>
            </div>
        </div>
    </div>

    <v-divider class="mt-8"></v-divider>
    <p class="font-weight-light pt-3 text-center te xt-2xl">สินค้าอื่นๆ</p>
    <p class="font-weight-light text-center text-2xl text-purple-600">
        ของผู้ขายคนนี้
    </p>
 
    <ProductOther />

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
    components: { MapView , ProductOther },
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
</style><style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
}
</style>
