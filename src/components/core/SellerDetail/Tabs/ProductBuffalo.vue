<template>
<div>
    <div class="col-md-12 col-sm-12 col-xs-12">
        

        <v-row dense>
            <v-col cols="12" sm="4" class="pt-6">
                <small>แสดง 1-12 จาก 200 ผลิตภัณท์</small>
            </v-col>
            <v-col cols="12" sm="4" class="relative ">
                <div class="flex rounded border-grey-light border bg-white">
                    <button>
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <i class="fas fa-search text-xl"></i>
                        </span>
                    </button>
                    <input class="w-full rounded " type="text" placeholder="ค้นหา">
                </div>
            </v-col>
            <v-col cols="12" sm="4" class="pt-2">
                <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px" outlined dense></v-select>

            </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="row">
            <div class="col-md-2 col-sm-3 col-6 cursor-pointer" v-for="i in 18" @click="$router.push('/user/productdetail/')">
                <v-hover v-slot:default="{ hover }">
                    <!-- <v-card class="mx-auto" color="grey lighten-4" max-width="600"> -->
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                        <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1066226/pexels-photo-1066226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" href="/#/user/productdetail/" class="" outlined>ดูรายละเอียด</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-4">
                            <div class="flex items-baseline mb-1">
                                <span class="inline-block bg-red-400 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">New</span>
                                <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                    ควาย
                                </div>
                            </div>
                            <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 group-hover:text-gray-900">แอปเปิ้ล</h4>
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
                    <!-- </v-card> -->
                </v-hover>
            </div>
        </div>

        <div class="text-center mt-6">
            <v-pagination v-model="page" :length="6" circle></v-pagination>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            select: "นิยม",
            options: ["", "นิยม", "ราคา: ต่ำ ไป สูง", "ราคา: สูง ไป ต่ำ"],
            page: 1,
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
</style>
