<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0" v-if="response">
        <form @submit.prevent="storeProduct()">
            <!-- <pre>{{product}}</pre> -->
            <v-text-field required dense rounded type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อสินค้า','Product name','產品名稱')" prepend-inner-icon="mdi-lead-pencil"></v-text-field>
            <v-textarea required   rounded type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')" prepend-inner-icon="mdi-clipboard-text-outline"></v-textarea>
             
            <v-select required dense rounded :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')" prepend-inner-icon="mdi-currency-btc"></v-select>
            <v-text-field required dense rounded v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field required dense rounded v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field required dense rounded v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคาสุดท้าย','PriceEnd','价格结束')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field required dense rounded type="date" class="w-full " v-model="product.end_date" filled :label="_lang('วันส่งมอบ','Delivery date','郵寄日期')" prepend-inner-icon="mdi-calendar"></v-text-field>
            <p class="text-red-600">
                * จำกัดไฟล์อัพโหลดได้สูงสุดที่ 5 ไฟล์ โดย ไฟล์ที่ 1,2,3 ต้องเป็นไฟล์รูปเท่านั้น และ ไฟล์ที่ 4,5 เป็นไฟล์วีดีโอเท่านั้น (ไม่จำเป็นต้องอัพโหลดครบทั้ง 5 ไฟล์)
             </p>
            <VueFileAgent required v-model="file" @select="filesSelected($event)" :multiple="true" :maxSize="'5MB'" :deletable="true" :maxFiles="5" :accept="'image/*,video/*'"></VueFileAgent>
            <!-- <pre>{{product.file1}}</pre> -->
            <v-select required dense rounded :items="choices.sell_type" item-text="name" item-value="id" v-model="product.sell_type" class="w-full pt-3" filled :label="_lang('ประเภทการซื้อ','Sales type','銷售類型')" prepend-inner-icon="mdi-calendar-alert"></v-select>
            <v-text-field required rounded v-if="product.sell_type == 0" type="date" v-model="product.buy_date" class="w-full pt-3" filled :label="_lang('วันที่สิ้นสุดประกาศซื้อ','Sale end date','銷售結束日期')" prepend-inner-icon="mdi-calendar-alert"></v-text-field>
            <v-select required dense rounded :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('สถานะประกาศ ','Announcement Status','公告狀態')" prepend-inner-icon="mdi-tag-multiple-outline"></v-select>
            <div class="">
                <div v-for="category,index in categories" :key="index">
                    <div class=""><v-icon>mdi-tag-outline</v-icon> {{category.name}}</div>
                    <v-checkbox class="-mb-6" v-for="detail,i in category.detail" :key="i" v-model="chooseCategories" :label="detail.name" :value="detail.id"></v-checkbox>
                    <div class="pt-3 pb-3">
                        <v-divider></v-divider>
                    </div>
                    
                </div>

            </div>
            <div class="mt-4">
                <v-btn rounded type="submit" x-large depressed class="w-full bgbtn" color="green accent-4" dark><v-icon>mdi-floppy</v-icon> {{_lang('บันทึก','Save','保存')}}</v-btn>
            </div>
            
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
import { App } from "@/store/app";
import {
    City
} from "@/store/city";
import axios from '@/plugins/axios'
@Component({
    components: { MapView },
    computed: {},
})

export default class Saller extends Vue {
    file: any = []
    farm: any = {}
    response: boolean = false;
    user: any = null
    profile: any = null
    saller: boolean = false;
    categories: any = null
    chooseCategories: any = []
    async created() {
        await Core.switchLoad(true)
        await this.loadFarm()
        await this.loadChoice();
        await this.setProductKey();
        this.product.product_type = 1;
        await Core.switchLoad(false)
        this.response  = true
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
        this.product.status = this.product.status
    }
    choices: any = {}
    public async loadChoice() {
        this.categories = await Core.getHttp(`/api/default/categories/`)
        this.choices = {
            "product_type": await Product.ProductType,
            "sell_type": await Product.SaleType,
            "price_type": await Product.PriceType,
            'status': await Product.StatusBuy
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
            await App.success("บันทึกประกาศสำเร็จแล้ว")
            await this.$router.go(-1)
        }

    }

    public async updateProduct() {
        await this.setProductKey()
        let store = await Core.putHttp(`/api/default/product/${this.product.id}/`, this.product)
        if (store.id) { await App.success("บันทึกประกาศสำเร็จแล้ว") }
        await this.$router.go(-1)
    }

    public async removeProduct() {
        let store = await Core.deleteHttp(`/api/default/product/${this.product.id}/`)
        if (store.id) {

            await App.success("บันทึกประกาศสำเร็จแล้ว")
            await this.$router.go(-1)
        }
    }

    async filesSelected(event: any) {
        console.log(event);
    }

    async storeImage(id: number) {
        var formData = new FormData();
        for (let index = 0; index < this.file.length; index++) {
            formData.append(`file${(index+1)}`, this.file[index].file);
        }
        await axios.put(`/api/default/productfile/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    }

}
</script>

<style scoped>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}

.bgbtn{ 
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='.1' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
}
</style>
 