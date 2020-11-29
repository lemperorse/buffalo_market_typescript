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
            <v-col cols="12" sm="4" class="relative pl-6 pt-3">
                <div class="flex rounded border-grey-light border bg-white">
                    <button>
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <i class="fas fa-search text-xl"></i>
                        </span>
                    </button>
                    <input class="w-full rounded " type="text" placeholder="ค้นหา">
                </div>
            </v-col>
            <v-col cols="12" sm="4" class="pl-6 pt-3">
                <v-select class="pa-0 " v-model="select" :items="options" style="margin-bottom: -20px" outlined dense></v-select>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <Product />

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
            items: [
                {
                    id: 0,
                    name: "ทั้งหมด",
                    children: [ 
                    ],
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
</style>
