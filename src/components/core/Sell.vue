<template>
<div>
    <ul class="breadcrumb mt-8 mb-4 rounded">
        <li><a href="/#/user/home/">หน้าแรก</a></li>
        <li>ประกาศซื้อ</li>
    </ul>

    <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
            <v-card>
                <v-card-title>
                    กรอง
                </v-card-title>
                <v-divider></v-divider>
                <div v-for="category,index in categories" :key="index">
                    <h2>{{category.name}}</h2>
                    <v-checkbox v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                </div>

                <v-card-title>ราคา</v-card-title>
                <div class="flex ">
                    <v-text-field name="name" label="ต่ำสุด" id="id"></v-text-field> - <v-text-field name="name" label="สูงสุด" id="id"></v-text-field>
                </div>

                <v-divider></v-divider>

            </v-card>
        </div>

        <div class="col-md-9 col-sm-9 col-xs-12">
            <!-- <v-row dense>
                <v-col cols="12" sm="4" class="pt-6">
                    <small>แสดง 1-12 จาก 200 ผลิตภัณท์</small>
                </v-col>
                <v-col cols="12" sm="4" class="relative pt-2">
                    <div class="flex rounded border-grey-light border bg-white hover:shadow-lg">
                        <button>
                            <span class="w-auto flex justify-end items-center text-grey p-2">
                                <i class="fas fa-search text-xl"></i>
                            </span>
                        </button>
                        <input class="w-full rounded " type="text" placeholder="ค้นหาสินค้าที่ต้องการ">
                    </div>
                </v-col>
                <v-col cols="12" sm="4" class="pt-3">
                    <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px" outlined dense></v-select>
                </v-col>
            </v-row> -->

            <v-divider></v-divider>

            <!-- <Product /> -->
            <div class="row">
                <div class="w-40 m-2 cursor-pointer" v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">

                    <v-hover v-slot:default="{ hover }">
                        <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                            <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                                <v-expand-transition>
                                    <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                        <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>ดูรายละเอียด </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <div class="p-6 ">
                                <div class="flex items-baseline mb-1">
                                    <span class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">ใหม่</span>
                                    <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide" v-for="cat,i in pu.category" :key="i">
                                        {{cat.name}}
                                    </div>
                                </div>
                                <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 "> {{pu.name}}</h4>

                                <div class=" text-orange-600 font-bold mb-1">
                                    <span v-if="pu.price_type">{{pu.price}}</span>
                                    <span v-else>{{pu.price_start}} - {{pu.price_end}}</span>
                                </div>
                                <div class="text-sm text-gray-600 font-light mb-1" v-if="pu.farm">
                                    <span class="fas fa-map-marker-alt"></span>
                                    <span v-if="pu.farm.province">{{pu.farm.province.name}}</span>
                                </div>
                            </div>
                            <hr>
                            <div class="text-xs text-center">
                                <span class="fas fa-bullhorn"></span> ผู้โพส : <span v-if="pu.farm.user">{{pu.farm.user.first_name}}</span>
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
    rate: any = []
    async created() {
        await this.loadProducts()
        await this.loadCategory();
        this.response = true
    }
    products: any = null
    response: boolean = false;

    async loadProducts() {
        this.products = await Core.getHttp(`/api/default/products/`)
    }
    categories: any = null
    chooseCategories: any = []
    async loadCategory() {
        this.categories = await Core.getHttp(`/api/default/categories/`)
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

/* Style the list */
ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
    background-color: #eee;
}

/* Display list items side by side */
ul.breadcrumb li {
    display: inline;
    font-size: 18px;
}

/* Add a slash symbol (/) before/behind each list item */
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}

/* Add a color to all links inside the list */
ul.breadcrumb li a {
    color: #0275d8;
    text-decoration: none;
}

/* Add a color on mouse-over */
ul.breadcrumb li a:hover {
    color: #01447e;
    text-decoration: underline;
}
</style>
