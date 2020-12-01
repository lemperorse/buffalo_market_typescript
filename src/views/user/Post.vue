<template>
<v-app>
    <div class="bg-gray-100">
        <div class="container mx-auto bg-gray-100 ">
            <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                ประกาศของ...(ฉัน)
            </h2>
            <!-- <v-row>
            <v-col cols="12" sm="6" class="py-2"> 
                <v-btn-toggle >
                    <v-btn @click="$router.push(`addpostbuy`)" depressed color="primary">
                        เพิ่มประกาศซื้อ
                    </v-btn>

                    <v-btn @click="$router.push(`addpostsell`)" depressed color="success">
                        เพิ่มประกาศขาย
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row> -->

            <!-- <v-tabs class="centered" color="primary" slider-color="primary">
                <v-tab> ประกาศซื้อ </v-tab>
                <v-tab-item class="bg-gray-100">
                    <PostBuy />
                </v-tab-item>
                <v-tab> ประกาศขาย </v-tab>
                <v-tab-item class="bg-gray-100">
                    <PostSell />
                </v-tab-item>
            </v-tabs> -->
            <v-toolbar class="mb-2 rounded-lg elevation-1" >
                <template>
                    <v-tabs class="border rounded" color="error" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                        <v-tab class="font-weight-black">ประกาศซื้อ</v-tab>
                        <v-tab class="font-weight-black">ประกาศขาย</v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
                <v-tab-item class="bg-gray-100">
                    <PostBuy />
                </v-tab-item>
                <v-tab-item class="bg-gray-100">
                    <PostSell />
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>

</v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import PostBuy from "@/components/post/PostBuy.vue"
import PostSell from "@/components/post/PostSell.vue"
export default {
    name: "post-page",
    components: {
        PostBuy,
        PostSell
    },
    data() {
        return {
            tabs: null,
            dialog: false,
        }
    }
};
</script>
