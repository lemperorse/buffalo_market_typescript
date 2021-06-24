<template>
<div class="bg-gray-100 h-full">
    <div class="container mx-auto">
        <div class="flex flex-wrap">
            <div class="w-full">
                <v-card class="rounded-lg">
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-blue-500">
                                <i class="fas fa-store-alt text-base mr-1"></i>{{_lang('เพิ่มประกาศซื้อ','Add product','添加產品')}}
                            </div> 
                        </div>
                    </div>
                </v-card>

                <div class="pt-3">
                    <v-card class="rounded-lg" >
                    <AddPostBuy />
                    </v-card>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import AddPostBuy from "@/components/post/AddPostBuy"
export default {
    name: "post-edit-page",
    components: {
        AddPostBuy
    },
    data() {
        return {

        }
    }
};
</script>
