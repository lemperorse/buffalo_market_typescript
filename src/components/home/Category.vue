<template>
<v-container>
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
</v-container>
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
