<template>
<!-- <v-app> -->
<div class="bg-gray-100 h-full">
    <div class="container mx-auto">
        <div class="w-full mb-6">
            <ol class="flex text-gray-700 bg-gray-300 rounded-full py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
                <li class="text-gray-500 select-none">/</li>
                <li class="px-2 text-green-600">{{_lang('รายละเอียดสินค้า','Product details','產品詳情')}} : {{product.name}}</li>
            </ol>
        </div>
        <ProductDetail />
    </div>
</div>
<!-- </v-app> -->
</template>

    
<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';  
import ProductDetail from "@/components/core/ProductDetail.vue"
import { User } from "@/store/user";
import { Auth } from "@/store/auth";
import { Core } from "@/store/core";
import { Map } from "@/store/map";
import { Product } from "@/store/product";
import {
    City
} from "@/store/city";
@Component({
    components: { ProductDetail },
    computed: {},
})

export default class PostSaller extends Vue {
    dialog: boolean = false
    async created() {
        await this.loadProduct();  
        this.response = true
    } 
    product: any = null 
    response: boolean = false;  

    async loadProduct() {
        let id = this.$route.query.product
        this.product = await Core.getHttp(`/api/default/products/${id}/`)
    } 
}
</script>

<style scoped>
.bg1 {
    background-color: #0EAD69;
}

a {
    color: black !important;
}

a:link {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
