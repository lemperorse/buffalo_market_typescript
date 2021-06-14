<template>
<div>
    <div class="bg-home">
        <div class="container mx-auto mt-4">
            <v-toolbar class="mb-2 m-1 elevation-0" >
                <template>
                    <v-tabs class="rounded-lg" color="teal accent-3" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                        <v-tab class="font-weight-black">{{_lang('ประกาศ','Announcement','產品')}}</v-tab>
                        <v-tab class="font-weight-black">{{_lang('แผนที่','Map','地圖')}}</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
                <v-tab-item class="">
                    <Buy />
                </v-tab-item>
                <v-tab-item class="">
                    <World />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</div>
</template>

<script>
import Buy from "@/components/core/Buy.vue"; 
import World from "@/components/core/World.vue";
import Popup from "@/components/core/Popup.vue"
import { Component, Vue } from "vue-property-decorator";
export default {
    name: "home-page",
    components: {
        Buy, 
        World,
        Popup,
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
</style>
