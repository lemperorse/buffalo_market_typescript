<template>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <v-row dense>
            <v-col cols="12" sm="8" class="flex flex-wrap">
                <div class="w-full md:w-1/2">
                    <div class="search_box">
                        <!-- <div class="search_btn"><i class="fas fa-search"></i></div> -->
                        <input type="text" class="input_search" v-model="search" id="id" :placeholder="_lang('ค้นหา...','What are you looking for?','搜索')">
                        <div class="search_btn" @click="loadProduct"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <hr class="m-1">
                <button @click="loadProduct" class="md:ml-1 md:mb-1 md:mt-0  w-full md:w-1/6 rounded p-3 bts hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                    <div class="text-white"><i class="fas fa-search"></i> {{_lang('ค้นหา','Search','搜索')}}</div>
                </button>
                <!-- <v-text-field dense prepend-inner-icon="fas fa-search " filled v-model="search" :label="_lang('ค้นหา','Search','搜索')" id="id"></v-text-field>
                <v-btn large @click="loadProduct" color="success" class="md:mt-1 ml-1 w-full md:w-1/12">{{_lang('ค้นหา','Search','搜索')}}</v-btn> -->
            </v-col>

            <v-col cols="12" sm="4" class="relative ">
                <div class="text-right">
                    <button @click="$router.push(`/user/addpostbuy`)" class="w-full md:w-1/2 mb-3 mt-1 rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                        <div class="text-white"><i class="far fa-plus-square"></i> {{_lang('เพิ่มประกาศซื้อ','Add product','添加產品')}}</div>
                    </button>
                </div>
            </v-col>
        </v-row>

        <v-divider class="mb-2"></v-divider>

        <div class="row">
            <!-- <div class="col-md-2 col-sm-4 col-6" v-if="products" v-for="product,i in products" :key="i"> -->
            <div class="w-36 m-2 md:mr-6 cursor-pointer" v-if="products" v-for="product,i in products" :key="i">
                <v-hover v-slot:default="{ hover }">
                    <!-- <v-card class="mx-auto" color="grey lighten-4" max-width="600"> -->
                    <div class="mx-auto card rounded-lg elevation-1 bg-white hover:shadow-lg overflow-hidden">
                        <v-img class="white--text align-end w-full rounded-t-lg" height="150px" :src="ximg(product.file1)">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${product.id}&name=${product.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}}</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-4">
                            <h4 class="font-semibold leading-tight mb-1 text-indigo-600 ">{{_lang('ชื่อสินค้า','Product','產品名稱')}} : {{product.name}}</h4>
                            <div class=" text-orange-600 font-bold mb-1">
                                <span class="text-sm" v-if="product.price_type">{{_lang('ราคา','Price','價錢')}} : {{product.price}}</span>
                                <span v-else>{{_lang('ราคา','Price','價錢')}} : {{product.price_start}} - {{product.price_end}}</span>
                            </div>
                            <!-- <div class="text-sm text-gray-600 font-light mb-1" v-if="product.farm">
                                <span class="fas fa-map-marker-alt"></span>
                                <span v-if="product.farm.province">{{product.farm.province.name}}</span>
                            </div> -->
                            <v-select @change="updateProduct(product)" :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('สถานะสินค้า ','Product status','產品狀態')"></v-select>
                            <div class=" flex ">
                                <button @click="$router.push(`/user/postbuyedit/?product=${product.id}`)" class="w-full rounded p-1 bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                    <div class="text-white"><i class="fas fa-pencil-alt"></i>{{_lang('แก้ไขประกาศ','Edit','編輯公告')}}</div>
                                </button>
                            </div>
                        </div>
                        <hr>
                        <div class="text-xs text-center bg1">
                            <span class="fas fa-bullhorn tw"></span> <span class="tw">{{_lang('ผู้โพส','Poster','海報')}} : {{user.first_name}}</span>
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
    choices: any = {}
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
            'status': await Product.StatusSell
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
        this.products = await Core.getHttp(`/api/default/product/?farm=${this.farm.id}&product_type=1&search=${this.search}`)
    }

    public async updateProduct(product: any) {
        let store = await Core.putHttp(`/api/default/products/${product.id}/`, product)
        if (store.id) {
            alert("Save product success")
            await this.loadProduct()
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

.wrapper {
    /* min-height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.bts{
    background: #0EAD69;
}

.search_box {
    /* background: #643fef; */
    background: #0EAD69;
    position: relative;
    padding: 15px;
    border-radius: 5px;
    display: flex;
}

.search_box .search_btn {
    width: 40px;
    height: 30px;
    border-radius: 15%;
    /* background: #7a5cf0; */
    background: #74C69D;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
}

.search_box .input_search {
    outline: none;
    border: 0;
    /* background: #7a5cf0; */
    background: #74C69D;
    border-radius: 5px;
    padding: 15px 20px;
    width: 300px;
    height: 30px;
    color: #fff;
}

::placeholder {
    color: #fff;
}

::-webkit-input-placeholder {
    color: #fff;
}

:-ms-input-placeholder {
    color: #fff;
}
</style>
