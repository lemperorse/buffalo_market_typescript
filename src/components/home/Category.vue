<template>
<div>
    <center>
        <h2 class="text-2xl font-bold text-blue-800 mt-10"> {{_lang('ประเภทสินค้าที่ประกาศซื้อขาย','Types of products advertised for sale','广告销售的产品类型')}} </h2>
    </center>
    <div class="flex flex-col w-full justify-center items-center " style="overflow-x:auto">
        <div class="flex mt-16 justify-center items-center w-full md:w-9/12">
            <div class="flex-1 text-center px-4 py-2 m-2" v-for="(cat,i) in categories" :key="i">
                <div @click="$router.push(`/product?cat=${cat.id}`)" class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img v-if="cat.image" class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80">

                    <img v-else class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80">

                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">{{cat.name}}</h1>
            </div>

        </div>

    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';
import {
    Core
} from "@/store/core";
import {
    Product
} from "@/store/product";
import {
    City
} from "@/store/city";
@Component({
    components: {},
    computed: {},
})

export default class PostSaller extends Vue {

    categories: any = null
    async created() {
        await this.loadCategory();
    }

    async loadCategory() {
        this.categories = await Core.getHttp(`/api/default/categories/`)
    }

}
</script>

<style>

</style>
