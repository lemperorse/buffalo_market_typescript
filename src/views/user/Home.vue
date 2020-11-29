<template>
<div>
    <v-app>
        <div class="bg-gray-100" >
            <!-- <img :src="test" alt=""> -->
            <div class="container mx-auto md:mt-4 ">
                <!-- <v-tabs class="centered border"  color="primary" slider-color="primary" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                    <v-tab> ประกาศซื้อ </v-tab>
                    <v-tab-item class="bg-gray-100">
                        <Buy />
                    </v-tab-item>
                    <v-tab> ประกาศขาย </v-tab>
                    <v-tab-item class="bg-gray-100">
                        <Sell />
                    </v-tab-item>
                    <v-tab> แผนที่ </v-tab>
                    <v-tab-item class="bg-gray-100">
                        <World />
                    </v-tab-item>
                </v-tabs> -->
                <v-toolbar class="mb-2 rounded-lg elevation-1"  > 
                    <template>
                        <v-tabs class="border rounded-lg " color="error" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                            <v-tab class="font-weight-black">ประกาศซื้อ</v-tab>
                            <v-tab class="font-weight-black">ประกาศขาย</v-tab>
                            <v-tab class="font-weight-black">แผนที่</v-tab> 
                        </v-tabs>
                    </template>
                </v-toolbar>
                <v-tabs-items v-model="tabs">
                    <v-tab-item class="bg-gray-100">
                        <Buy />
                    </v-tab-item>
                    <v-tab-item class="bg-gray-100">
                        <Sell />
                    </v-tab-item>
                    <v-tab-item class="bg-gray-100">
                        <World />
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>
    </v-app>

</div>
</template>

<script>
import Buy from "@/components/core/Buy.vue";
import Sell from "@/components/core/Sell.vue";
import World from "@/components/core/World.vue";
import test from "@/assets/ink_landscape_ching_ming_festival_4104466.jpg"
import { Component, Vue } from "vue-property-decorator";
export default {
    name: "home-page",
    components: {
        Buy,
        Sell,
        World,
    },
    data() {
        return {
            test,
            tabs: null,
            dialog: false,
        }
    }
};
</script>
<style>
/* Helper classes */ 
.color { 
  background-color: #FFFBE6 !important;
} 
 
</style>