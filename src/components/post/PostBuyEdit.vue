<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form @submit.prevent="updateProduct()">
            <v-text-field type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อ','Name','名称')"></v-text-field>
            <v-text-field type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')"></v-text-field>
            <v-select :items="choices.product_type" item-text="name" item-value="id" v-model="product.product_type" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select>

            <v-select :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')"></v-select>

            <v-text-field v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')"></v-text-field>
            <v-text-field v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')"></v-text-field>
            <v-text-field v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคา End','PriceEnd','价格结束')"></v-text-field>

            <a v-if="product.file1" target="_blank" rel="noopener noreferrer" :href="product.file1">ไฟล์ 1</a>
            <VueFileAgent v-model="f1" :multiple="false" :maxSize="'5MB'" :deletable="true"  :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file2" target="_blank" rel="noopener noreferrer" :href="product.file2">ไฟล์ 2</a>
            <VueFileAgent v-model="f2" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file3" target="_blank" rel="noopener noreferrer" :href="product.file3">ไฟล์ 3</a>
            <VueFileAgent v-model="f3" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file4" target="_blank" rel="noopener noreferrer" :href="product.file4">ไฟล์ 4</a>
            <VueFileAgent v-model="f4" :multiple="false" :maxSize="'5MB'" :deletable="true"  :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file5" target="_blank" rel="noopener noreferrer" :href="product.file5">ไฟล์ 5</a>
            <VueFileAgent v-model="f5" :multiple="false" :maxSize="'5MB'" :deletable="true"  :accept="'image/*,video/*'"></VueFileAgent>

            <v-select :items="choices.sell_type" item-text="name" item-value="id" v-model="product.sell_type" class="w-full " filled :label="_lang('SellType','SellType','销售类型')"></v-select>
            <v-text-field v-if="product.sell_type == 0" type="date" v-model="product.buy_date" class="w-full " filled :label="_lang('วันที่ซื้อ','Date of purchase','购买日期')"></v-text-field>
            <v-select :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select>

            <div>
                <div v-for="category,index in categories" :key="index">
                    <h2>{{category.name}}</h2>
                    <v-checkbox v-for="detail,i in category.detail" :key="i" v-model="product.category" :label="detail.name" :value="detail.id"></v-checkbox>
                </div>

            </div>
            <v-btn type="submit" x-large color="success">Save</v-btn>
        </form>

        <button @click="removeProduct()" class="mt-2 rounded p-1 bg-red-500 hover:bg-refd-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
            <div class="text-white"><i class="mdi mdi-delete"></i> ลบประกาศ</div>
        </button>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import axios from '@/plugins/axios'
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

export default class Saller extends Vue {
    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    saller: boolean = false;
    categories: any = null
    chooseCategories: any = []
    f1: any = {}
    f2: any = {}
    f3: any = {}
    f4: any = {}
    f5: any = {}
    async created() {
        await this.loadFarm()
        await this.loadChoice();
        await this.loadProduct();
        // await this.setProductKey();
    }

    async loadFarm() {
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
        this.response = true
    }

    public product: any = {}
    public async setProductKey() {
        //this.product.id = 0
        this.product.category = this.chooseCategories
        this.product.farm = this.farm.id
        this.product.user = this.user.pk
        this.product.status = 5
    }
    choices: any = {}
    public async loadChoice() {
        this.categories = await Core.getHttp(`/api/default/categories/`)
        this.choices = {
            "product_type": await Product.ProductType,
            "sell_type": await Product.SaleType,
            "price_type": await Product.PriceType,
            'status': await Product.StatusSell
        }
    }
    public async loadProduct() {
        let product = this.$route.query.product
        this.product = await Core.getHttp(`/api/default/product/${product}/`)
    }

    public async storeProduct() {
        await this.setProductKey()
        let store = await Core.postHttp(`/api/default/product/`, this.product)
        if (store.id) { alert("Save product success") }
    }

    public async updateProduct() {
        delete this.product.file1;
        delete this.product.file2;
        delete this.product.file3;
        delete this.product.file4;
        delete this.product.file5;
        let store = await Core.putHttp(`/api/default/product/${this.product.id}/`, this.product)
        if (store.id) {
            await this.storeImage(store.id);
            alert("Save product success")
        }
    }

    public async removeProduct() {
        let check = confirm('Are you sure ?')
        if (check) {
            let store = await Core.deleteHttp(`/api/default/product/${this.product.id}/`)
            alert("Delete product success")
            await this.$router.go(-1)
        }
    }

    async storeImage(id: number) {
        var formData = new FormData();
        if (this.f1.file) {
            formData.append(`file1`, this.f1.file);
        }
        if (this.f2.file) {
            formData.append(`file2`, this.f2.file);
        }
        if (this.f3.file) {
            formData.append(`file3`, this.f3.file);
        }
        if (this.f4.file) {
            formData.append(`file4`, this.f4.file);
        }
        if (this.f5.file) {
            formData.append(`file5`, this.f5.file);
        }
        await axios.put(`/api/default/productfile/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}
</script>

<style>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}
</style>

<style>

</style>
