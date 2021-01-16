<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form @submit.prevent="storeProduct()">
            <v-text-field type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อ','Name','名称')"></v-text-field>
            <v-text-field type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')"></v-text-field>
            <v-select :items="choices.product_type" item-text="name" item-value="id" v-model="product.product_type" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')"></v-select>

            <v-select :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')"></v-select>

            <v-text-field v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')"></v-text-field>
            <v-text-field v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')"></v-text-field>
            <v-text-field v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคา End','PriceEnd','价格结束')"></v-text-field>
            <VueFileAgent v-model="file"  @select="filesSelected($event)" :multiple="true" :maxSize="'5MB'" :deletable="true" :maxFiles="5"  :accept="'image/*,video/*'" ></VueFileAgent> 
            <pre>{{product.file1}}</pre>
            <!-- <v-text-field type="file" v-model="product.file1" class="w-full " filled :label="_lang('ไฟล์ 1','File1','文件1')"></v-text-field>
            <v-text-field type="file" v-model="product.file2" class="w-full " filled :label="_lang('ไฟล์ 2','File2','文件2')"></v-text-field>
            <v-text-field type="file" v-model="product.file3" class="w-full " filled :label="_lang('ไฟล์ 3','File3','文件3')"></v-text-field>
            <v-text-field type="file" v-model="product.file4" class="w-full " filled :label="_lang('ไฟล์ 4','File4','文件4')"></v-text-field>
            <v-text-field type="file" v-model="product.file5" class="w-full " filled :label="_lang('ไฟล์ 5','File5','文件5')"></v-text-field> -->
            <v-select :items="choices.sell_type" item-text="name" item-value="id" v-model="product.sell_type" class="w-full " filled :label="_lang('SellType','SellType','销售类型')"></v-select>
            <v-text-field v-if="product.sell_type == 0" type="date" v-model="product.buy_date" class="w-full " filled :label="_lang('วันที่ซื้อ','Date of purchase','购买日期')"></v-text-field>

            <div>
                <div v-for="category,index in categories" :key="index">
                    <h2>{{category.name}}</h2>
                    <v-checkbox v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                </div>

            </div>
            <v-btn type="submit" x-large color="success">Save</v-btn>
        </form>
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
import axios from '@/plugins/axios'
@Component({
    components: { MapView },
    computed: {},
})

export default class Saller extends Vue {
    file:any = []
    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    saller: boolean = false;
    categories: any = null
    chooseCategories: any = []
    async created() {
        await this.loadFarm()
        await this.loadChoice();
        await this.setProductKey();
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
        }
    }
    public async loadProduct() {
        this.product = Core.getHttp(`/api/default/product/`)
    }

    public async storeProduct() {
        await this.setProductKey()
        let store = await Core.postHttp(`/api/default/product/`, this.product)
        if (store.id) { 
            await this.storeImage(store.id)
            alert("Save product success") 
            }
    }

    public async updateProduct() {
        await this.setProductKey()
        let store = await Core.putHttp(`/api/default/product/${this.product.id}/`, this.product)
        if (store.id) { alert("Save product success") }
    }

    public async removeProduct() {
        let store = await Core.deleteHttp(`/api/default/product/${this.product.id}/`)
        if (store.id) { 
            
         alert("Save product success") }
    }

    async filesSelected(event:any){
        console.log(event);
    }

    async storeImage(id:number){
        var formData = new FormData(); 
            for (let index = 0; index < this.file.length; index++) {
               formData.append(`file${(index+1)}`,this.file[index].file); 
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
