<template>
<div class="flex flex-col justify-center items-center w-full rounded-xl shadow-xl mb-10 p-4 bg-white ">
    <v-alert v-if="product.product_type" border="left" type="amber lighten-3" class="w-full pa-8">
        <div class="flex">
            <div class="row wrap">
                <i class="em em-shopping_bags text-2xl" aria-role="presentation" aria-label="SHOPPING TROLLEY"></i>
                <h1 class="text-3xl text-yellow-700">{{_lang('ประกาศซื้อ','Buy announcement','购买公告')}}</h1>
            </div>
        </div>
    </v-alert>
    <v-alert v-else dense border="left" type="amber lighten-2" class="w-full pa-8">
        <div class="flex">
            <div class="row wrap">
                <i class="em em-shopping_trolley text-2xl" aria-role="presentation" aria-label="SHOPPING TROLLEY"></i>
                <h1 class="text-3xl text-yellow-800">{{_lang('ประกาศขาย','Sell announcement','出售公告')}}</h1>
            </div>
        </div> 
    </v-alert>
    <div class="md:w-10/12 w-full">
        <div class="row rounded-lg overflow-hidden">
            <div class="col-md-5 col-sm-5 col-xs-12">
                <!-- <pre>{{this.product}}</pre> -->
                <v-carousel class="rounded w-full shadow-xl" height="400px" cycle>
                    <v-carousel-item v-if="product.file1">
                        <v-img class="w-full h-full" :src="$server+'/'+product.file1" alt="" srcset="" />
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file2">
                        <v-img class="w-full h-full" :src="$server+'/'+product.file2" alt="" srcset="" />
                    </v-carousel-item>
                    <v-carousel-item v-if="product.file3">
                        <v-img class="w-full h-full" :src="$server+'/'+product.file3" alt="" srcset="" />
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
                <div class=" ">
                    <p class="text-3xl mb-0 mt-2 font-bold"> {{product.name}}</p>
                    <v-card-actions class="mt-4 pa-3 bg-gray-100 rounded-lg  ">
                        <div class="">
                            <div class="text-3xl text-yellow-600" v-if="product.price_type"> {{product.price}} {{_lang('฿','฿','฿')}}</div>
                            <div class="text-3xl text-yellow-600" v-else> {{product.price_start}} - {{product.price_end}} {{_lang('฿','฿','฿')}}</div>
                        </div>
                    </v-card-actions>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <div class="text-2xl  mt-4 m-1">
                        <v-icon>mdi-label </v-icon> {{_lang('ประเภทสินค้า','Product Type','產品類別')}}
                    </div>
                    <v-chip v-for="category,i in product.category" :key="i" class="m-1 rounded-xl " color="orange accent-4" label text-color="white">
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

                    <div class="bg-gray-100 rounded-lg p-4  ">
                        <div class="text-2xl text-gray-500 mt-4 m-1">{{_lang('นำทางไปยังร้านค้าที่ขายสินค้านี้','Navigate to the store that sells this item.','導航到出售此商品的商店。')}}</div>
                        <div class="mt-4">
                            <v-btn @click="openMap(farm.location)" type="submit" large outlined rounded class="md:w-1/2 w-full p-2 bgbg" dark>
                                <v-icon class="pr-2">mdi-map-marker-radius-outline</v-icon> {{_lang('นำทางไปยังร้านค้าที่ขายสินค้านี้','Navigate','導航')}}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full rounded-lg p-2 mt-12 overflow-hidden bgbg">
        <div class=" m-4 ">
            <v-row wrap class=" justify-center items-center">
                <v-col cols="12" sm="6" md="8">
                    <v-row wrap>
                        <div class="pa-2 ml-5 ">
                            <v-avatar size="65">
                                <v-img v-if="farm.user_image" :src="$server+'/'+product.farm.user_image" />
                                <v-img v-else src="https://www.ibeargroup.com/booking/assets/images/icon_shop.png" />
                            </v-avatar>

                        </div>
                        <div class="ml-2 mt-3 ">
                            <h3 v-if="product.farm" class="text-2xl text-white">
                                <span>{{product.farm.name}}</span>
                                <!-- <span v-if="profile">{{profile.first_name}} {{profile.last_name}}</span> -->
                            </h3>
                            <h3 v-if="product.farm" class="text-base text-white">
                                <span>จังหวัด {{product.farm.province.name}}</span>
                            </h3>
                            <v-divider></v-divider>
                            <h3 v-if="product.farm" class="text-base text-white">
                                <span>{{product.farm.tel}}</span>
                            </h3>
                            <!-- <h3 v-if="product.farm" class="text-lg text-white">{{_lang('จังหวัด','Province','省')}} : {{profile.province.name}} {{profile.amphur.name}} {{profile.district.name}}</h3>
                            <h3 v-if="product.farm" class="text-lg text-white">{{_lang('โทร','Tel','稱呼')}} : {{profile.tel}}</h3> -->
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
                    <v-btn @click="$router.push(`/user/productall?product=${product.id}&name=${product.farm.user.first_name}`)" rounded x-large outlined color="" type="submit" class="w-full p-2" dark>
                        <v-icon class="pr-2">mdi-shopping</v-icon> {{_lang('ดูร้านค้า','View','查看產品')}}
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>

    <div class="w-full mt-2 md:w-1/1 xl:w-1/1 p-3 md:p-3 mb-2 rounded-lg mt-12 bg-white">
        <div class="row rounded-lg p-2 overflow-hidden">
            <div class="col-sm-12 col-xs-12 col-md-12">
                <v-tabs class="rounded" color="orange accent-4" next-icon="mdi-arrow-right-bold-circle-outline" prev-icon="mdi-arrow-left-bold-circle-outline" show-arrows>
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
                            {{_lang('ที่อยู่','Address','地址')}} : <span>{{product.farm.farm_address}} &nbsp;</span>
                            <span>{{product.farm.district.name}}</span>
                            <span>{{product.farm.amphur.name}}</span>
                            <span>{{product.farm.province.name}}</span>
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
import { App } from "@/store/app";
import {
    City
} from "@/store/city";
import moment from 'moment'
@Component({
    components: { MapView, ProductOther },
    computed: {},
})

export default class PostSaller extends Vue {
    dialog: boolean = false
    async created() {
        await this.loadProduct();

        await this.loadProducts()
        await this.loadFarm()
        // this.response = true
    }
    products: any = null
    product: any = null
    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null

    async loadFarm() {
        // this.user = await Auth.getUser()
        // this.profile = await User.getProfileFull();
        this.farm = this.product.farm // await Core.getHttp(`/api/default/farm/${this.product.farm.id}/`)
        this.profile = this.product.farm.user

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
            // alert("Save product success")
            await App.success("บันทึกข้อมูลสำเร็จ")
            await this.loadProduct()
        }
    }

    async openBrowser(position: any) {
        let me = `${position.coords.latitude},${position.coords.longitude}`
        let to = `${this.farm.latitude},${this.farm.longitude}`
        console.log(me, `https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`);
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${me}&destination=${to}`, '_blank');
    }
    async openMap(location: any) {
        let origin = `19.0199381,99.9218023`
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition((position: any) => {
                origin = `${position.coords.latitude},${position.coords.longitude}`
            });
        }
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${location}`);

    }

    ximg(file: any) {
        return (file) ? file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }

    dateOut(date: any) {
        let convert = moment(date).format('DD/MM/YYYY')
        return convert
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
    background-color: #ffff99;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1000 1000'%3E%3Cg fill='%23ffd573'%3E%3Cpolygon points='1000 -50 0 -50 500 450'/%3E%3Cpolygon points='550 500 1050 1000 1050 0'/%3E%3Cpolygon points='-50 0 -50 1000 450 500'/%3E%3Cpolygon points='0 1050 1000 1050 500 550'/%3E%3C/g%3E%3Cg fill='%23ffaa4d'%3E%3Cpolygon points='1000 -133.3 0 -133.3 500 366.7'/%3E%3Cpolygon points='633.3 500 1133.3 1000 1133.3 0'/%3E%3Cpolygon points='-133.3 0 -133.3 1000 366.7 500'/%3E%3Cpolygon points='0 1133.3 1000 1133.3 500 633.3'/%3E%3C/g%3E%3Cg fill='%23ff8026'%3E%3Cpolygon points='1000 -216.7 0 -216.7 500 283.3'/%3E%3Cpolygon points='716.7 500 1216.7 1000 1216.7 0'/%3E%3Cpolygon points='-216.7 0 -216.7 1000 283.3 500'/%3E%3Cpolygon points='0 1216.7 1000 1216.7 500 716.7'/%3E%3C/g%3E%3Cg fill='%23F50'%3E%3Cpolygon points='1000 -300 0 -300 500 200'/%3E%3Cpolygon points='800 500 1300 1000 1300 0'/%3E%3Cpolygon points='-300 0 -300 1000 200 500'/%3E%3Cpolygon points='0 1300 1000 1300 500 800'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='%23FE0' points='0 707.1 0 292.9 292.9 0 707.1 0 1000 292.9 1000 707.1 707.1 1000 292.9 1000'/%3E%3Cg fill='%23ffc800'%3E%3Cpolygon points='464.6 -242.5 -242.5 464.6 464.6 464.6'/%3E%3Cpolygon points='535.4 464.6 1242.5 464.6 535.4 -242.5'/%3E%3Cpolygon points='-242.5 535.4 464.6 1242.5 464.6 535.4'/%3E%3Cpolygon points='535.4 1242.5 1242.5 535.4 535.4 535.4'/%3E%3C/g%3E%3Cg fill='%23ffa200'%3E%3Cpolygon points='405.7 -301.4 -301.4 405.7 405.7 405.7'/%3E%3Cpolygon points='594.3 405.7 1301.4 405.7 594.3 -301.4'/%3E%3Cpolygon points='-301.4 594.3 405.7 1301.4 405.7 594.3'/%3E%3Cpolygon points='594.3 1301.4 1301.4 594.3 594.3 594.3'/%3E%3C/g%3E%3Cg fill='%23ff7b00'%3E%3Cpolygon points='346.8 -360.3 -360.3 346.8 346.8 346.8'/%3E%3Cpolygon points='653.2 346.8 1360.3 346.8 653.2 -360.3'/%3E%3Cpolygon points='-360.3 653.2 346.8 1360.3 346.8 653.2'/%3E%3Cpolygon points='653.2 1360.3 1360.3 653.2 653.2 653.2'/%3E%3C/g%3E%3Cg fill='%23F50'%3E%3Cpolygon points='287.9 -419.2 -419.2 287.9 287.9 287.9'/%3E%3Cpolygon points='712.1 287.9 1419.2 287.9 712.1 -419.2'/%3E%3Cpolygon points='-419.2 712.1 287.9 1419.2 287.9 712.1'/%3E%3Cpolygon points='712.1 1419.2 1419.2 712.1 712.1 712.1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bgbg {
    background-color: #ee5522;
}

.line2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
