<template>
<div class="bg-gray-100">
    <div class="container mx-auto bg-gray-100">
        <div class="flex flex-wrap">
            <div class="w-full">
                <div class="mb-2 relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded border-l-4 border-green-500">
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-blue-500">
                                <i class="fas fa-store-alt text-base mr-1"></i>{{_lang('แก้ไขประกาศซื้อ','Edit','修改購買')}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded border-l-4 border-green-500">
                    <PostBuyEdit />
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
