<template>
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <v-row dense>
            <v-col cols="12" sm="4" class=" pt-4">
                <div class="flex rounded border-grey-light border bg-white">
                    <button>
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <i class="fas fa-search text-xl"></i>
                        </span>
                    </button>
                    <input class="w-full rounded " type="text" placeholder="ค้นหาสินค้าในประกาศซื้อของฉัน">
                </div>
                <small class="">แสดง 1-12 จาก 200 ผลิตภัณท์</small>
            </v-col>

            <v-col cols="12" sm="8" class="pt-5">
                <div class="text-right">
                    <button @click="$router.push(`/user/addpostbuy`)" class="w-full md:w-1/4 rounded p-2 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                        <div class="text-white"><i class="far fa-plus-square"></i> เพิ่มประกาศซื้อ</div>
                    </button>
                </div>
            </v-col>
        </v-row>
 

        <v-divider></v-divider>

        <div class="row ">
            <div class="col-md-2 col-sm-4 col-6" v-for="i in 12">
                <v-hover v-slot:default="{ hover }">
                    <!-- <v-card class="mx-auto" color="grey lighten-4" max-width="600"> -->
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                        <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" href="/#/user/productdetail/" class="" outlined>ดูรายละเอียด</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-4">
                            <div class="flex items-baseline mb-1">
                                <span class="inline-block bg-yellow-400 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">ใหม่</span>
                                <div class="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                    ควาย
                                </div>
                            </div>
                            <h4 class="font-semibold text-lg leading-tight truncate mb-1 text-indigo-600 ">ควายเผือก</h4>
                            <div class=" text-orange-600 font-bold mb-1">฿ 12,000</div>
                            <div class="text-sm text-gray-600 font-light mb-1">
                                <span class="fas fa-map-marker-alt"></span> เชียงใหม่
                            </div>
                            <v-select value=" " :items="status" dense outlined label="สถานะประกาศ"></v-select>
                            <!-- <v-btn href="/#/user/postbuyedit/" class="mb-4" color="indigo" dark block depressed>แก้ไขประกาศ</v-btn> -->
                            <div class="flex ">
                                <!-- <button @click="$router.push(`/user/postbuyedit`)" class="w-full p-1 rounded bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50" type="submit">
                                    <div class="text-white"><i class="fas fa-pencil-alt text-lg"></i>แก้ไขประกาศ</div>
                                </button> -->
                                <button @click="$router.push(`/user/postbuyedit`)" class="w-full rounded p-1 bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                    <div class="text-white"><i class="fas fa-pencil-alt"></i> แก้ไขประกาศ</div>
                                </button>
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
            page: 1,
            status: ["รับซื้อ", "ได้รับสินค้าแล้ว", "ยกเลิก"],
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
