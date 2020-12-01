<template>

<div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12 cursor-pointer" v-for="i in 12" @click="$router.push('/user/productdetail/')">
        <v-hover v-slot:default="{ hover }">
            <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border ">
                <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                    <v-expand-transition>
                        <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                            <v-btn v-if="hover" href="/#/user/productdetail/" class="" outlined>ดูรายละเอียด</v-btn>
                        </div>
                    </v-expand-transition>
                </v-img>
                <div class="p-6" >
                    <div class="flex items-baseline mb-1">
                        <span class="inline-block bg-red-400 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">New</span>
                        <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                            ควาย
                        </div>
                    </div>
                    <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 " >ควายเผือก</h4>
                    <div class=" text-orange-600 font-bold mb-1">฿ 12,000</div>
                    <div class="text-sm text-gray-600 font-light mb-1">
                        <span class="fas fa-map-marker-alt"></span> เชียงใหม่
                    </div>
                </div>
                <hr>
                <div class="text-xs text-center">
                    <span class="fas fa-bullhorn"></span> ผู้โพส : นายแดง มีสุขใจ
                </div>
            </div>
        </v-hover>
    </div>
</div>
</template>

<script>
import test from "@/assets/ink_landscape_ching_ming_festival_4104466.jpg"
export default {
    data() {
        return {
            test
        }
    }

}
</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.8;
    position: absolute;
    width: 100%;
}

.cardproduct { 
    background-image: url('https://images.pexels.com/photos/2039606/pexels-photo-2039606.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

</style>
