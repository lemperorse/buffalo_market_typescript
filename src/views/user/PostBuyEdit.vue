<template>
<div class="bg-gray-100">
    <div class="container mx-auto bg-gray-100">
        <div class="flex flex-wrap">
            <div class="w-full">
                <v-card class="rounded-lg" outlined>
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-blue-500">
                                <i class="fas fa-store-alt text-xl mr-1"></i>{{_lang('แก้ไขประกาศซื้อ','Edit','修改購買')}}
                            </div>
                        </div>
                    </div>
                </v-card>
                <div class="pt-3">
                    <v-card class="rounded-lg" outlined>
                        <PostBuyEdit />
                    </v-card>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import PostBuyEdit from "@/components/post/PostBuyEdit"
export default {
    name: "post-edit-page",
    components: {
        PostBuyEdit
    },
    data() {
        return {

        }
    }
};
</script>
