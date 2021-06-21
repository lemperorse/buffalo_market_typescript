<template>
<div class="bg-blue-600">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8">
                <h2 class="font-bold text-2xl text-white">ประกาศขายล่าสุด</h2><br>
                <v-slide-group multiple show-arrows><br>
                    <v-slide-item v-for="n in 25" :key="n"  >
                        <div class="flex w-full"> 
                            <div class="w-1/2 md:w-1/5 p-2 " v-for="pu,i in products" :key="i" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card   height="320px" width="240px" elevation="3"  >
                                        <v-img class="white--text align-end w-full rounded-t-lg h-2/3" :src="ximg(pu.file1)">
                                            <v-expand-transition>
                                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                                    <v-btn v-if="hover" @click="$router.push(`/user/productdetail?product=${pu.id}&name=${pu.name}`)" class="" outlined>{{_lang('ดูรายละเอียด','Details','詳情')}} </v-btn>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                        <v-card-text class="">
                                            <span class="font-semibold leading-tight mb-1 text-indigo-600 text-sm">{{pu.name}}</span>
                                            <div class="font-bold mb-1">
                                                <span class="text-sm" v-if="pu.price_type">{{_lang('฿','฿','฿')}} {{pu.price}}</span>
                                                <span v-else>{{_lang('฿','฿','฿')}} {{pu.price_start}} - {{pu.price_end}}</span>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </div>
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>
    </v-container>
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

    products: any = null
    async created() {
        this.products = await Core.getHttp(`/api/default/products/`)

    }


        ximg(file: any) {
        return (file) ? process.env.VUE_APP_SERVER + '/' + file : 'https://images.pexels.com/photos/4052387/pexels-photo-4052387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    }


}
</script>

<style>

</style>
