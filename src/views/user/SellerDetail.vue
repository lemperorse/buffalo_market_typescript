<template>
<v-app>
    <div class="bg-gray-100">
        <div class="container mx-auto">
            <SellerDetail />
        </div>
    </div>

</v-app>
</template>

<script>
  import SellerDetail from "@/components/core/SellerDetail/SellerDetail.vue"
  import { Component, Vue } from "vue-property-decorator";
  export default {
      name: "seller-detail-page",
      components: {
          SellerDetail
      },
      data() {
          return {

          }
      }
  };
</script>
