<template>
<div>
    <div class="bg1">  
        <div class="container mx-auto mt-4 "> 
            <v-toolbar class="mb-2 rounded elevation-1" >
                <template>
                    <v-tabs class="rounded-lg"  color="error" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                        <v-tab class="font-weight-black">{{_lang('ประกาศ','Announcement','產品')}}</v-tab>
                        <v-tab class="font-weight-black">{{_lang('แผนที่','Map','地圖')}}</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
                <v-tab-item class="bg1">
                    <Buy />
                </v-tab-item>
                <v-tab-item class="bg1">
                    <World />
                </v-tab-item>
            </v-tabs-items>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0EAD69" fill-opacity="1" d="M0,256L24,224C48,192,96,128,144,122.7C192,117,240,171,288,197.3C336,224,384,224,432,197.3C480,171,528,117,576,80C624,43,672,21,720,64C768,107,816,213,864,234.7C912,256,960,192,1008,138.7C1056,85,1104,43,1152,53.3C1200,64,1248,128,1296,176C1344,224,1392,256,1416,272L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
        </svg>
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

.bg1 {
    background-color: #F5F5F5;
} 
</style>
