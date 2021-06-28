<template>
<div class="">
    <div class="w-full  md:w-1/1 xl:w-1/1 p-3 md:p-3 rounded-lg bg-white shadow ">
        <div class="row rounded-lg overflow-hidden">
            <div class="col-md-5 col-sm-5 col-xs-12">
                <v-carousel class="rounded w-full" height="400px" cycle>
                    <v-carousel-item v-if="product.file1">
                        <img class="w-full h-full" :src="$server+'/'+product.file1" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file2">
                        <img class="w-full h-full" :src="$server+'/'+product.file2" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file3">
                        <img class="w-full h-full" :src="$server+'/'+product.file3" alt="" srcset="">
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file4">
                        <video class="w-full h-full" controls autoplay>
                            <source :src="$server+'/'+product.file4" type="video/mp4">
                            <source :src="$server+'/'+product.file4" type="video/ogg">
                        </video>
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file5">
                        <video class="w-full h-full" controls autoplay>
                            <source :src="$server+'/'+product.file5" type="video/mp4">
                            <source :src="$server+'/'+product.file5" type="video/ogg">
                        </video>
                    </v-carousel-item>
                </v-carousel>

            </div>
            <div class="col-md-7 col-sm-7 col-xs-12 ">
                <div class="">
                    <p class="text-3xl mb-0 mt-2 font-bold"> {{product.name}}</p>
                    <v-card-actions class="mt-4 pa-2 bg-gray-200 rounded-lg ">
                        <div class="">
                            <div class="text-2xl text-gray-500" v-if="product.price_type">{{_lang('ราคา','Price','價錢')}} : {{product.price}} {{_lang('฿','฿','฿')}}</div>
                            <div class="text-2xl text-gray-500" v-else>{{_lang('ราคา','Price','價錢')}} : {{product.price_start}} - {{product.price_end}} {{_lang('฿','฿','฿')}}</div>
                        </div>
                    </v-card-actions>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <div class="text-2xl  mt-4 m-1"><v-icon>mdi-label </v-icon> {{_lang('ประเภทสินค้า','Product Type','產品類別')}}</div>
                    <v-chip v-for="category,i in product.category" :key="i" class="m-1 rounded-lg " color="teal darken-3" label text-color="white">
                        <v-icon left>
                            mdi-label
                        </v-icon>
                        {{category.name}}
                    </v-chip>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <div class="text-2xl pt-4">
                        <v-icon>mdi-note-text-outline </v-icon> {{_lang('รายละเอียด','Detail','詳情')}}
                    </div>
                    <p class="pt-4 text-xl line2">
                        <v-icon>mdi-lead-pencil</v-icon> {{product.detail}}
                    </p>
                    <!-- <v-divider class="mt-2 mb-2"></v-divider>
                    <v-card-actions class="pa-0">
                        <div class=" pt-3">
                            <div class="text-2xl" v-if="product.price_type">{{_lang('ราคา','Price','價錢')}} : {{product.price}} {{_lang('฿','฿','฿')}}</div>
                            <div class="text-2xl" v-else>{{_lang('ราคา','Price','價錢')}} : {{product.price_start}} - {{product.price_end}} {{_lang('฿','฿','฿')}}</div>
                        </div>
                    </v-card-actions>
                    <v-divider class="mt-6 mb-6"></v-divider> -->

                    <div class="bg-gray-200 rounded-lg p-4">
                        <div class="text-2xl text-gray-500 mt-4 m-1">{{_lang('นำทางไปยังร้านค้าที่ขายสินค้านี้','Navigate to the store that sells this item.','導航到出售此商品的商店。')}}</div>
                        <div class="mt-4">
                            <v-btn @click="openMap" type="submit" large outlined rounded class="md:w-1/2 w-full p-2  bg-nav" dark>
                                <v-icon class="pr-2">mdi-map-marker-radius-outline</v-icon> {{_lang('นำทางไปยังร้านค้าที่ขายสินค้านี้','Navigate','導航')}}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="rounded-lg p-2 mt-6 overflow-hidden bg-white shadow ">
        <div class=" m-4 ">
            <v-row wrap class=" justify-center  items-center">
                <v-col cols="12" sm="6" md="8">
                    <v-row wrap>
                        <div class="pa-2 ml-5">
                            <v-avatar size="65">
                                <img :src="$server+'/'+profile.profile_image" />
                            </v-avatar>
                        </div> 

                        <div class="ml-2 mt-3 ">
                            <h3 v-if="product.farm" class="text-lg">
                                <span v-if="product.farm.user">{{_lang('ชื่อ','Name','名稱')}} : {{product.farm.user.first_name}} {{product.farm.user.last_name}}</span>
                            </h3>
                            <h3 v-if="product.farm" class="text-lg">{{_lang('จังหวัด','Province','省')}} : {{profile.province.name}} {{profile.amphur.name}} {{profile.district.name}}</h3>
                            <h3 v-if="product.farm" class="text-lg">{{_lang('โทร','Tel','稱呼')}} : {{profile.tel}}</h3>
                        </div> 
                    </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <!-- <div>
                        <div class="text--primary " v-if="product.farm">{{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span> <br /></div>
                        <div class="">
                            <v-btn @click="$router.push(`/user/productall?product=${product.id}&name=${product.farm.user.first_name}`)" rounded type="submit" class="md:w-1/2 w-full bg-nav p-2" dark>
                                <v-icon>mdi-shopping-search</v-icon> {{_lang('ดูสินค้า','View','查看產品')}}
                            </v-btn>
                        </div>
                    </div> -->
                    <v-btn @click="$router.push(`/user/productall?product=${product.id}&name=${product.farm.user.first_name}`)" rounded x-large outlined color="teal darken-3" type="submit" class="w-full p-2" dark>
                        <v-icon class="pr-2">mdi-shopping</v-icon> {{_lang('ดูร้านค้า','View','查看產品')}}
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>

    <div class="w-full mt-2 md:w-1/1 xl:w-1/1 p-3 md:p-3 mb-2 rounded-lg mt-6 bg-white shadow ">
        <div class="row rounded-lg p-2 overflow-hidden">
            <div class="col-sm-12 col-xs-12 col-md-12">
                <v-tabs class="rounded" color="teal darken-4" next-icon="mdi-arrow-right-bold-circle-outline" prev-icon="mdi-arrow-left-bold-circle-outline" show-arrows>
                    <v-tab class="">
                        {{_lang('รายละเอียด','Detail','詳情')}}
                    </v-tab>
                    <v-tab>
                        {{_lang('ช่องทางการติดต่ออื่นๆ','Other contact','其他聯絡人')}}
                    </v-tab>
                    <v-tab-item>
                        <p class="pt-4  text-lg">
                            <v-icon>mdi-lead-pencil</v-icon> {{product.detail}}
                        </p>
                    </v-tab-item>
                    <v-tab-item>
                        <p class="pt-4  text-lg">
                            Email : <span>{{product.farm.email}}</span>
                        </p>
                        <p class=" text-lg">
                            Facebook : <span>{{product.farm.facebook}}</span>
                        </p>
                        <p class=" text-lg">
                            Line : <span>{{product.farm.line}}</span></p>
                        <p class=" text-lg">
                            {{_lang('เบอร์ติดต่อ','Phone number','電話號碼')}} : <span>{{product.farm.tel}}</span>
                        </p>
                        <p class=" text-lg">
                            {{_lang('ที่อยู่','Address','地址')}} : <span>{{product.farm.address}}</span>
                            <span>{{product.farm.province.name}}</span>
                            <span>{{product.farm.amphur.name}}</span>
                            <span>{{product.farm.district.name}}</span>
                            <span>{{product.farm.zipcode}}</span>
                        </p>
                    </v-tab-item>
                </v-tabs>
            </div>
        </div>
    </div>

    <!-- <v-divider class="mt-8"></v-divider> -->
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
</style>
