<template>
<v-app>
    <div class="container mx-auto">
        <div class="flex flex-wrap">
            <div class="w-full">
                <div class="mb-2 relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-blue-500">
                                <i class="fas fa-store-alt text-base mr-1"></i>เพิ่มประกาศขาย
                            </div>
                        </div>
                    </div>
                </div>

                <div class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
                    <AddPostSell />
                </div>

            </div>
        </div>
    </div>
</v-app>
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
