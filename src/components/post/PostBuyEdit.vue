<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form @submit.prevent="updateProduct()">
            <v-text-field dense rounded type="text" v-model="product.name" class="w-full " filled :label="_lang('ชื่อสินค้า','Product name','產品名稱')" prepend-inner-icon="mdi-lead-pencil"></v-text-field>
            <v-text-field dense rounded type="text" v-model="product.detail" class="w-full " filled :label="_lang('รายละเอียด','Detail','详情')" prepend-inner-icon="mdi-clipboard-text-outline"></v-text-field>
            <v-select dense rounded :items="choices.product_type" item-text="name" item-value="id" v-model="product.product_type" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')" prepend-inner-icon="mdi-basket-outline"></v-select>

            <v-select dense rounded :items="choices.price_type" item-text="name" item-value="id" v-model="product.price_type" class="w-full " filled :label="_lang('ประเภทราคา','Price Type','价格类型')" prepend-inner-icon="mdi-currency-btc"></v-select>

            <v-text-field dense rounded v-if="product.price_type" type="text" v-model="product.price" class="w-full " filled :label="_lang('ราคา','Price','价钱')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field dense rounded v-if="!product.price_type" type="text" v-model="product.price_start" class="w-full " filled :label="_lang('ราคาเริ่มต้น','PriceStart','价格开始')" prepend-inner-icon="mdi-currency-btc"></v-text-field>
            <v-text-field  denserounded v-if="!product.price_type" type="text" v-model="product.price_end" class="w-full " filled :label="_lang('ราคาสุดท้าย','PriceEnd','价格结束')" prepend-inner-icon="mdi-currency-btc"></v-text-field>

            <a  v-if="product.file1" target="_blank" rel="noopener noreferrer" :href="product.file1">ไฟล์ 1</a>
            <VueFileAgent v-model="f1" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file2" target="_blank" rel="noopener noreferrer" :href="product.file2">ไฟล์ 2</a>
            <VueFileAgent v-model="f2" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>

            <a v-if="product.file3" target="_blank" rel="noopener noreferrer" :href="product.file3">ไฟล์ 3</a>
            <VueFileAgent v-model="f3" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file4" target="_blank" rel="noopener noreferrer" :href="product.file4">ไฟล์ 4</a>
            <VueFileAgent v-model="f4" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <a v-if="product.file5" target="_blank" rel="noopener noreferrer" :href="product.file5">ไฟล์ 5</a>
            <VueFileAgent v-model="f5" :multiple="false" :maxSize="'5MB'" :deletable="true" :accept="'image/*,video/*'"></VueFileAgent>
            <!-- <pre>{{product}}</pre> -->
            <v-select dense rounded :items="choices.sell_type" item-text="name" item-value="id" v-model="product.sell_type" class="w-full " filled :label="_lang('ประเภทการซื้อ','Sales type','銷售類型')" prepend-inner-icon="mdi-calendar-alert"></v-select>
            <v-text-field dense rounded v-if="product.sell_type == 0" type="date" v-model="product.buy_date" class="w-full " filled :label="_lang('วันที่สิ้นสุดประกาศซื้อ','Sale end date','銷售結束日期')" prepend-inner-icon="mdi-calendar-alert"></v-text-field>
            <v-select dense rounded :items="choices.status" item-text="name" item-value="id" v-model="product.status" class="w-full " filled :label="_lang('ประเภทสินค้า ','Product Type','产品类别')" prepend-inner-icon="mdi-tag-multiple-outline"></v-select>

            <div class="pt-3 pb-3">
                <div v-for="category,index in categories" :key="index">
                    <h2><v-icon>mdi-tag-outline</v-icon> {{category.name}}</h2>
                    <v-checkbox class="-mb-6" v-for="detail,i in category.detail" :key="i" v-model="product.category" :label="detail.name" :value="detail.id"></v-checkbox>
                    <div class="pt-3 pb-3">
                        <v-divider></v-divider>
                    </div>
                </div>
                

            </div>  
            <v-btn large rounded type="submit" class="w-full bgbtn" dark><v-icon dark>mdi-floppy</v-icon>{{_lang('บันทึก','Save','保存')}}</v-btn>
        </form>
        <div class="pt-3">
            <v-btn large rounded type="submit" @click="removeProduct()" class="w-full" color="error"><v-icon dark>mdi mdi-delete</v-icon>{{_lang('ลบประกาศ','Delete','刪除')}}</v-btn>
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
        if (store.id) { alert("Save product success") }
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
            alert("Save product success")
            await this.$router.go(-1)
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

<style scoped>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}

.bgbtn{
    background-color: #0ead69;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%230fb574' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%230ebd7f' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%230dc58a' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%230bce95' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2306d6a0' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%230adea1' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%230ce6a1' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%230eeea2' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%230ff7a3' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%230fffa3' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>
