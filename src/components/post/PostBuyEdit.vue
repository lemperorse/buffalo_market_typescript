<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form @submit.prevent="updateProduct()">
            <v-text-field dense rounded type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อสินค้า','Product name','產品名稱')" prepend-inner-icon="mdi-lead-pencil"></v-text-field>
            <v-select dense rounded :items="choices.product_type" item-text="name" item-value="id" v-model="product.product_type" class="w-full " filled :label="_lang('ประเภทประกาศ ','Announcement type','公告類型')" prepend-inner-icon="mdi-basket-outline"></v-select>
            <v-select dense rounded :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')" prepend-inner-icon="mdi-currency-btc"></v-select>
            <v-text-field dense rounded v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field dense rounded v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field dense rounded v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคาสุดท้าย','PriceEnd','价格结束')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field dense rounded type="date" class="w-full" v-model="product.end_date" filled :label="_lang('วันส่งมอบ','Delivery date','郵寄日期')" prepend-inner-icon="mdi-calendar"></v-text-field>
            <v-textarea dense rounded type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')" prepend-inner-icon="mdi-clipboard-text-outline"></v-textarea>

        
            <a  v-if="product.file1" target="_blank" rel="noopener noreferrer" :href="$server+'/'+product.file1">ดูภาพหรือวิดีโอไฟล์ 1</a>
            <VueFileAgent v-model="f1" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file2" target="_blank" rel="noopener noreferrer" :href="$server+'/'+product.file2">ดูภาพหรือวิดีโอไฟล์ 2</a>
            <VueFileAgent v-model="f2" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file3" target="_blank" rel="noopener noreferrer" :href="$server+'/'+product.file3">ดูภาพหรือวิดีโอไฟล์ 3</a>
            <VueFileAgent v-model="f3" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file4" target="_blank" rel="noopener noreferrer" :href="$server+'/'+product.file4">ดูภาพหรือวิดีโอไฟล์ 4</a>
            <VueFileAgent v-model="f4" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file5" target="_blank" rel="noopener noreferrer" :href="$server+'/'+product.file5">ดูภาพหรือวิดีโอไฟล์ 5</a>
            <VueFileAgent v-model="f5" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <!-- <pre>{{product}}</pre> -->
            <v-select dense rounded :items="choices.sell_type" item-text="name" item-value="id" v-model="product.sell_type" class="w-full " filled :label="_lang('ประเภทการซื้อ','Sales type','銷售類型')" prepend-inner-icon="mdi-calendar-alert"></v-select>
            <v-text-field dense rounded v-if="product.sell_type == 0" type="date" v-model="product.buy_date" class="w-full " filled :label="_lang('วันที่สิ้นสุดประกาศซื้อ','Sale end date','銷售結束日期')" prepend-inner-icon="mdi-calendar-alert"></v-text-field>
            <v-select dense rounded :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('สถานะประกาศ ','Announcement Status','公告狀態')" prepend-inner-icon="mdi-tag-multiple-outline"></v-select>

            <div class="pt-3 pb-3">
                <div v-for="category,index in categories" :key="index">
                    <h2><v-icon>mdi-tag-outline</v-icon> {{category.name}}</h2>
                    <v-checkbox class="-mb-6" v-for="detail,i in category.detail" :key="i" v-model="product.category" :label="detail.name" :value="detail.id"></v-checkbox>
                    <div class="pt-3 pb-3">
                        <v-divider></v-divider>
                    </div>
                </div> 
            </div>  
            <v-btn x-large depressed rounded type="submit" class="w-full bgbtn" color="green accent-4" dark><v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึก','Save','保存')}}</v-btn>
        </form>
        <div class="pt-3">
            <v-btn x-large depressed rounded type="submit" @click="removeProduct()" class="w-full bgbtn" color="error"><v-icon dark>mdi mdi-delete</v-icon>{{_lang('ลบประกาศ','Delete','刪除')}}</v-btn>
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
import axios from '@/plugins/axios'
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
        // await Core.switchLoad(true)
        await this.loadFarm()
        await this.loadChoice();
        await this.loadProduct();
        // await Core.switchLoad(false)
        // await this.setProductKey();
    }

    async loadFarm() {
        await Core.switchLoad(true)
        this.user = await Auth.getUser()
        this.profile = await User.getProfileFull();
        this.farm = await Core.getHttp(`/api/user/farm/${this.user.pk}/`)
        await Core.switchLoad(false)
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
            'status': await Product.StatusBuy
        }
    }
    public async loadProduct() {
        let product = this.$route.query.product
        this.product = await Core.getHttp(`/api/default/product/${product}/`)
    }

    public async storeProduct() {
        await this.setProductKey()
        let store = await Core.postHttp(`/api/default/product/`, this.product)
        if (store.id) { await App.success("บันทึกประกาศสำเร็จแล้ว") }
        await this.$router.go(-1)
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
            await App.success("บันทึกประกาศสำเร็จแล้ว")
            await this.$router.go(-1)
        }
    }

    public async removeProduct() {
        let check = await App.confirm('คุณแน่ใจใช่ไหม', 'ที่จะลบประกาศนี้')
        if (check) {
            let store = await Core.deleteHttp(`/api/default/product/${this.product.id}/`)
            await App.error("ลบประกาศสำเร็จแล้ว")
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
