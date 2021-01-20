<template>
<!-- <v-app> -->
    <div class="bg-gray-100">
        <div class="container mx-auto">
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
