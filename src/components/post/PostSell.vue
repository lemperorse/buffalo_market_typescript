<template>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <v-row dense>
            <v-text-field prepend-inner-icon="fas fa-search " filled v-model="search" label="ค้นหา" id="id"></v-text-field> <v-btn @click="loadProduct" color="success">ค้นหา</v-btn>
          

            <v-col cols="12" sm="8" class="pt-5">
                <div class="text-right">
                    <button @click="$router.push(`/user/addpostsell`)" class="w-full md:w-1/4 rounded p-2 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                        <div class="text-white"><i class="far fa-plus-square"></i> เพิ่มประกาศขาย</div>
                    </button>
                </div>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="row"> 
            <div class="col-md-2 col-sm-4 col-6" v-if="products" v-for="product,i in products" :key="i">
                <v-hover v-slot:default="{ hover }">
                    <!-- <v-card class="mx-auto" color="grey lighten-4" max-width="600"> -->
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                        <v-img class="white--text align-end w-full"  height="150px" :src="ximg(product.file1)">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${product.id}&name=${product.name}`)" class="" outlined>ดูรายละเอียด</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-4">
                            <div class="flex items-baseline mb-1">
                                <span class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">ใหม่</span>
                                <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide" v-for="cat,i in product.category" :key="i">
                                    {{cat.name}}
                                </div>
                            </div>
                            <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 ">{{product.name}}</h4>
                            <div class=" text-orange-600 font-bold mb-1">
                                <span v-if="product.price_type" >{{product.price}}</span>
                                <span v-else>{{product.price_start}} - {{product.price_end}}</span>
                            </div>
                            <div class="text-sm text-gray-600 font-light mb-1" v-if="product.farm">
                                <span class="fas fa-map-marker-alt"></span> 
                                <span v-if="product.farm.province">{{product.farm.province.name}}</span>
                            </div>
                          <v-select @change="updateProduct(product)" :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select>
           
 
                            <!-- <v-btn href="/#/user/postselledit/" class="mb-4" color="indigo" dark block depressed>แก้ไขประกาศ</v-btn> -->
                            <div class="flex ">
                                <button @click="$router.push(`/user/postselledit/?product=${product.id}`)" class="w-full rounded p-1 bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                    <div class="text-white"><i class="fas fa-pencil-alt"></i> แก้ไขประกาศ</div>
                                </button>
                            </div>
                        </div>
                        <hr>
                        <div class="text-xs text-center">
                            <span class="fas fa-bullhorn"></span> ผู้โพส : นายแดง มีสุขใจ
                        </div>
                    </div>
                    <!-- </v-card> -->
                </v-hover>
            </div>
        </div>

        <div class="text-center mt-6">
            <v-pagination v-model="page" :length="6" circle></v-pagination>
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
    choices:any = {}
    page: number = 1
    status: any = ['มีสินค้า', 'สินค้าหมด', 'ขายแล้ว', 'ยกเลิก']
    search: any = ''
    headers: any = [
        { text: '', value: 'id' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
    ]

    async created() {
        await this.loadFarm();
        await this.loadProduct();
        this.choices = {
            'status':await Product.StatusSell
        }
        this.response = true
    }

    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`) 
    }

    products: any = null
    async loadProduct() {
        this.products = await Core.getHttp(`/api/default/products/?farm=${this.farm.id}&product_type=0&search=${this.search}`)
    }

    public async updateProduct(product:any) { 
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) { 
            alert("Save product success")  
            await this.loadProduct()
            }
    }

     ximg(file:any){
        return (file)?file:'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
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
