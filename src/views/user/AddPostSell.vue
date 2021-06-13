<template>
<div class="">
    <div class="container mx-auto ">
        <div class="flex flex-wrap">
            <div class="w-full">
                <v-card class="rounded-lg" outlined>
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-blue-500">
                                <i class="fas fa-store-alt text-base mr-1"></i>{{_lang('เพิ่มประกาศขาย','Add product','添加產品')}}
                            </div>
                        </div>
                    </div>
                </v-card>

                <div class="pt-3">
                    <v-card class="rounded-lg" outlined>
                    <AddPostSell />
                    </v-card>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import AddPostSell from "@/components/post/AddPostSell"
export default {
    name: "post-edit-page",
    components: {
        AddPostSell
    },
    data() {
        return {
            
        }
    }
};
</script>
