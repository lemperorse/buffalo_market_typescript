<template>
<div>
    <v-app>
        <div class="">
            <div class="md:mt-4"> 
                <v-tabs-items v-model="tabs">
                    <v-tab-item class=" ">
                        <Buy />
                    </v-tab-item> 
                    <v-tab-item class=" ">
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
import World from "@/components/core/World.vue";
import { Component, Vue } from "vue-property-decorator";
export default {
    name: "home-page",
    components: {
        Buy, 
        World,
    },
    data() {
        return {
            tabs: 1,
            dialog: false,
        }
    },
    async created() {
       
        if (this.$route.query.tab == 1) {
            this.tab = 1
        } else if (this.$route.query.tab == 2) {
            this.tab = 2
        } else {

        }
    }
};
</script>

<style>
/* Helper classes */ 
</style>
