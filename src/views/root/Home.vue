<template>
<div>
    <div class="bg2">
        <div class="container mx-auto mt-4"> 
            <Popup />
            <div class="mb-2 bg-white rounded shadow-md rounded-t">
                <Category />
            </div>
            <v-toolbar class="mb-2 rounded elevation-0">
                <template>
                    <v-tabs class="rounded-lg bg3" color="success" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                        <v-tab class="font-weight-black">{{_lang('ประกาศ','Announcement','產品')}}</v-tab>
                        <v-tab class="font-weight-black">{{_lang('แผนที่','Map','地圖')}}</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
                <v-tab-item class="bg2">
                    <Buy />
                </v-tab-item>
                <v-tab-item class="bg2">
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
import Popup from "@/components/core/Popup.vue"
import Category from "@/components/core/Category.vue"
import { Component, Vue } from "vue-property-decorator";
export default {
    name: "home-page",
    components: {
        Buy,
        Sell,
        World,
        Popup,
        Category
    },
    data() {
        return {
            tabs: null,
            // dialog: false,
        }
    },
    async created() {
        if (this.$route.query.tab == 1) {
            this.tabs = 0
        } else if (this.$route.query.tab == 2) {
            this.tabs = 1
        } else {
        }
        this.dialog=true;
    }
};
</script>

<style scoped>
.color {
    background-color: #FFFBE6 !important;
}

.bg1 {
    background-color: #F5F5F5;
}

.bg2 {
    background-color: #F5F5F5;
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='800 0 1600 900'%3E%3Cpolygon fill='%2343cc20' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%2315aa6c' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2306c853' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%231ca35f' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2300c274' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23219d51' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%2300bc8c' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23279643' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%2319b39b' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%232b8f35' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%234aaaa2' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%232f8826' points='943 900 1210 900 971 687'/%3E%3C/svg%3E"); */
    background-attachment: fixed;
    background-size: cover;
}

h1 {
    text-align: center;
    margin: 1.5em;
}
</style>
