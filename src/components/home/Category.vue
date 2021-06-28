<template>
<div>
    <!-- <v-container>
    <v-row justify="center">
        <v-col cols="12" sm="8">
            <div class="flex justify-around items-around p-6">
                <div class="w-40 h-32  border-2 rounded-xl p-2 " v-for="(category,i) in categories" :key="i">
                    <div class=" flex flex-col justify-center items-center ">
                        <i class="em em-athletic_shoe text-4xl" aria-role="presentation" aria-label="ATHLETIC SHOE"></i><br>
                        {{category.name}}
                    </div>
                </div> 
            </div>
        </v-col>
    </v-row>
</v-container> -->
    <center>
        <h2 class="text-2xl font-bold text-blue-800 mt-10"> {{_lang('ประเภทสินค้าที่ประกาศซื้อขาย','Types of products advertised for sale','广告销售的产品类型')}} </h2>
    </center> 
    <div class="flex flex-col w-full justify-center items-center " style="overflow-x:auto">
        <div class="flex mt-16 justify-center items-center w-full md:w-8/12">
            <div class="flex-1 text-center px-4 py-2 m-2">
                <div class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80">
                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">Fun</h1>
            </div>

            <div class="flex-1 text-center px-4 py-2 m-2">
                <div class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80">
                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">Travel</h1>
            </div>

            <div class="flex-1 text-center px-4 py-2 m-2">
                <div class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1052&amp;q=80">
                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">Food</h1>
            </div>

            <div class="flex-1 text-center px-4 py-2 m-2">
                <div class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1053&amp;q=80">
                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">Sketch</h1>
            </div>

            <div class="flex-1 text-center px-4 py-2 m-2">
                <div class="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                    <img class="object-cover w-full h-full" src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80">
                </div>
                <h1 class="pt-16 text-base font-semibold text-gray-900">My Work</h1>
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
