<template>
<div>
 
       
        <div class="bg-gray-100">
            <div class="container mx-auto md:mt-4 ">
                <v-toolbar class="mb-2 rounded-lg elevation-1">
                    <template>
                        <v-tabs class="border rounded-lg " color="error" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                            <v-tab class="font-weight-black">ประกาศซื้อ</v-tab> 
                            <v-tab class="font-weight-black">แผนที่</v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>
                <v-tabs-items v-model="tabs">
                    <v-tab-item class="bg-gray-100">
                        <Buy />
                    </v-tab-item> 
                    <v-tab-item class="bg-gray-100">
                        <World />
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>
 

</div>
</template>

<script>
import Buy from "@/components/core/Buy.vue";
import Sell from "@/components/core/Sell.vue";
import World from "@/components/core/World.vue";
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
            tabs: null,
            dialog: false,
        }
    },
    async created() {
        if (this.$route.query.tab == 1) {
            this.tabs = 0
        } else if (this.$route.query.tab == 2) {
            this.tabs = 1
        } else {

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
