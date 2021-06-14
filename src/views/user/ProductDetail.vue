<template>
<!-- <v-app> -->
<div class="">
    <div class="container mx-auto">
        <!-- <div class="w-full mb-6 ">
            <ol class="flex text-gray-500  rounded-full py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
                <li class="text-gray-500 select-none">/</li>
                <li class="px-2 text-green-600">{{_lang('รายละเอียดสินค้า','Product Details','產品詳情')}}</li>
            </ol> 
        </div> -->
        <div class="w-full mb-6">
            <ol class="flex text-gray-700 bg-gray-300 rounded-full py-2 px-2">
                <li class="px-2"><a href="/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li> 
                <li class="text-gray-500 select-none">/</li> 
                <li class="px-2 text-green-600">{{_lang('โปรไฟล์','Profile','輪廓')}}</li>
            </ol> 
        </div>
        <ProductDetail />
    </div>
</div>
<!-- </v-app> -->
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProductDetail from "@/components/core/ProductDetail.vue"
export default {
    name: "product-detail-page",
    components: {
        ProductDetail
    },
    data() {
        return {

        }
    }
};
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
