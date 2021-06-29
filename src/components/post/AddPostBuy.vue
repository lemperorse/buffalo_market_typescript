<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form @submit.prevent="storeProduct()">
            <v-text-field required dense rounded type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อสินค้า','Product name','產品名稱')" prepend-inner-icon="mdi-lead-pencil"></v-text-field>
            <v-text-field required dense rounded type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')" prepend-inner-icon="mdi-clipboard-text-outline"></v-text-field>
            <v-select required dense rounded :items="choices.product_type" item-text="name" item-value="id" v-model="product.product_type" class="w-full " filled :label="_lang('ประเภทประกาศ ','Announcement type','公告類型')" prepend-inner-icon="mdi-basket-outline"></v-select>

            <v-select required dense rounded :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')" prepend-inner-icon="mdi-currency-btc"></v-select>

            <v-text-field required dense rounded v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field required dense rounded v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field required dense rounded v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคาสุดท้าย','PriceEnd','价格结束')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
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
            <v-btn rounded type="submit" large class="w-full bgbtn" dark><v-icon>mdi-floppy</v-icon> {{_lang('บันทึก','Save','保存')}}</v-btn>
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
    file: any = []
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
            alert("Save product success")
            await this.$router.go(-1)
        }

    }

    public async updateProduct() {
        await this.setProductKey()
        let store = await Core.putHttp(`/api/default/product/${this.product.id}/`, this.product)
        if (store.id) { alert("Save product success") }
        await this.$router.go(-1)
    }

    public async removeProduct() {
        let store = await Core.deleteHttp(`/api/default/product/${this.product.id}/`)
        if (store.id) {

            alert("Save product success")
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
    background-color: #6da29e;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%236da29e' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%236a9e9a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23679995' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23649591' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%2361908d' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%235e8c88' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%235b8784' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23588380' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23557f7c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23527a78' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23507673' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%234d726f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%234a6e6b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23476967' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23446563' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2341615f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233f5d5b' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%233c5957' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
 