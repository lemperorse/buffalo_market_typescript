<template>
<div class="row">
    <div class="col-md-3 col-sm-3 col-xs-12">
        <v-card>
            <v-card-title>
                กรอง
            </v-card-title>
            <v-divider></v-divider>
            <template>
                <v-treeview :items="items" :open="[0]" :active="[0]" :selected-color="'#fff'" activatable open-on-click dense></v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>ราคา</v-card-title>

            <v-range-slider v-model="range" :max="max" :min="min" :height="10" class="align-center" dense></v-range-slider>
            <v-row class="pa-2" dense>
                <v-col cols="12" sm="5">
                    <v-text-field :value="range[0]" label="ต่ำสุด" outlined dense @change="$set(range, 0, $event)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                    <p class="pt-2 text-center">ถึง</p>
                </v-col>
                <v-col cols="12" sm="5">
                    <v-text-field :value="range[1]" label="สูงสุด" outlined dense @change="$set(range, 1, $event)"></v-text-field>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>จังหวัด</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>อำเภอ</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>ตำบล</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </v-card>
    </div>

    <div class="col-md-9 col-sm-9 col-xs-12">
        <v-row dense>
            <v-col cols="12" sm="4" class="pt-6">
                <small>แสดง 1-12 จาก 200 ผลิตภัณท์</small>
            </v-col>
            <v-col cols="12" sm="4" class="relative pt-2">
                <div class="flex rounded border-grey-light border bg-white">
                    <button>
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <i class="fas fa-search text-xl"></i>
                        </span>
                    </button>
                    <input class="w-full rounded " type="text" placeholder="ค้นหาสินค้าที่ต้องการ">
                </div>
            </v-col>
            <v-col cols="12" sm="4" class="pt-3">
                <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px" outlined dense></v-select>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <!-- <Product /> -->
        <div class="row">
            <div class="col-md-3 col-sm-6 col-6 cursor-pointer" v-for="i in 12" @click="$router.push('/user/productdetail/')">
                <v-hover v-slot:default="{ hover }">
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border ">
                        <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" href="/#/user/productdetail/" class="" outlined>ดูรายละเอียด</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-6">
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
                        </div>
                        <hr>
                        <div class="text-xs text-center">
                            <span class="fas fa-bullhorn"></span> ผู้โพส : นายแดง มีสุขใจ
                        </div>
                    </div>
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
import Product from "@/components/core/Product/Product.vue"
export default {
    components: {
        Product
    },
    data() {
        return {
            range: [0, 10000],
            min: 0,
            max: 10000,
            select: "นิยม",
            options: ["", "นิยม", "ราคา: ต่ำ ไป สูง", "ราคา: สูง ไป ต่ำ"],
            page: 1,
            items: [{
                    id: 0,
                    name: "ทั้งหมด",
                    children: [],
                },
                {
                    id: 1,
                    name: "ควาย",
                    children: [
                        { id: 1, name: "ควายเอเชีย" },
                        { id: 2, name: "ควายแอฟริกา" },
                        { id: 3, name: "ควายแคระ" },
                        { id: 4, name: "ควายปลัก" },
                        { id: 5, name: "ควายแม่น้ำ" },
                    ],
                },
                {
                    id: 2,
                    name: "ผลิตภัณฑ์จากฟาร์ม",
                    children: [
                        { id: 6, name: "เนื้อ" },
                        { id: 7, name: "หนัง" },
                        { id: 8, name: "เขา" },
                    ],
                },
                {
                    id: 3,
                    name: "ปุ๋ย",
                    children: [],
                },
                {
                    id: 4,
                    name: "อุปกรณ์การเกษตกร",
                    children: [
                        { id: 9, name: "เชือก" },
                        { id: 10, name: "มีด" },
                        { id: 11, name: "เสียม" },
                        { id: 12, name: "คราด" },
                        { id: 13, name: "จอบ" },
                        { id: 14, name: "เคียว" },
                    ],
                },
                {
                    id: 5,
                    name: "อื่นๆ",
                    children: [],
                },
            ],
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
