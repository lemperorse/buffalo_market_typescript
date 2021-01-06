<template>
<v-app>
    <div class="bg-gray-100">
        <div class="container mx-auto">
            <BuyProduct />
        </div>
    </div>
</v-app>
</template>

<script>
 import { Component, Vue } from "vue-property-decorator";
 import BuyProduct from "@/components/core/BuyProduct.vue"
 export default {
     name: "product-detail-page",
     components: {
         BuyProduct
     },
     data() {
         return {

         }
     }
 };
</script>
