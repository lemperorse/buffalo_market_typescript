<template>
<div class="bg-gray-100 h-full">
    <div class="container mx-auto ">
        <ol class="flex text-gray-700 bg-gray-200 rounded-full py-2 px-2">
            <li class="px-2"><a href="/#/" class="hover:underline">{{_lang('หน้าแรก','Home','家')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2"><a href="/#/user/myshop/" class="hover:underline">{{_lang('ร้านค้าของฉัน','My shop','我的店鋪')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2"><a href="/#/user/myshopsell/" class="hover:underline">{{_lang('ประกาศขายของฉัน','My sale announcement','我的銷售公告')}}</a></li>
            <li class="text-gray-500 select-none">/</li>
            <li class="px-2 text-green-600">{{_lang('แก้ไขประกาศขาย','Edit','編輯銷售')}}</li>
        </ol>
        <div class="flex flex-wrap pt-4">
            <div class="w-full">
                <v-card class="rounded-lg">
                    <div class="px-4 py-5 flex-auto">
                        <div class="text-center">
                            <div class="text-green-500">
                                <i class="fas fa-store-alt text-xl mr-1"></i>{{_lang('แก้ไขประกาศขาย','Edit','編輯銷售')}}
                            </div>
                        </div>
                    </div>
                </v-card>

                <div class="pt-3">
                    <v-card class="rounded-lg">
                    <PostSellEdit />
                    </v-card>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import PostSellEdit from "@/components/post/PostSellEdit"
export default {
    name: "post-edit-page",
    components: {
        PostSellEdit
    },
    data() {
        return {
            price: false,
        }
    }
};
</script>
<style scoped>
a {
    color: black !important;
}

a:link {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>