<template>
<div>
    <v-row dense>
        <div class="flex flex-wrap">
            <v-col cols="12">
                <v-card class="elevation-1">
                    <div class="d-flex flex-wrap">
                        <v-avatar class="ma-3 rounded" size="125" tile>
                            <v-img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></v-img>
                        </v-avatar>
                        <div>
                            <v-card-title class="headline">
                                <div class="text-xl">รายการสินค้า : 20 รายการ</div>
                            </v-card-title>
                            <v-card-subtitle>
                                <div>ชื่อ : นายแดง อิอิ</div>
                                <div>ที่อยู่ : 19 ตำบลแม่กา อำเภอเมืองพะเยา พะเยา 56000</div>
                                <div>เบอร์โทรศัพท์ : 0123456789</div>
                                <!-- <v-btn @click="dialog = true" class="py-2 px-4" outlined color="blue">
                                    นำทาง
                                </v-btn> -->
                                <div class="flex ">
                                    <button @click="dialog = true" class="md:w-1/2 w-full p-1 rounded bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" type="submit">
                                        <div class="text-white">นำทาง</div>
                                    </button>
                                </div>
                                <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
                                    <v-card>
                                        <v-card-title primary-title>
                                            นำทาง <v-spacer></v-spacer>
                                            <v-btn @click="dialog = false" dark icon color="red">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>

                                        </v-card-title>
                                        <v-card>
                                            <v-card-text>
                                                <img src="https://www.img.in.th/images/759e9362e5014422ea9fa2deaf85ce15.png" class="w-full h-auto md:h-full" alt="" />
                                                <p class="text-xl pt-6">
                                                    บิ๊กไอซ์ฟาร์มควายไทย 53 หมู่ที่ 1 ต.ทับยายเชียง
                                                    อ.พรหมพิราม จ.พิษณุโลก
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-card>
                                </v-dialog>

                            </v-card-subtitle>

                        </div>
                        <div>
                            <v-card-title class="headline">
                                <div class="text-xl">ช่องทางการติดต่ออื่นๆ</div>
                            </v-card-title>

                            <v-card-subtitle>
                                <div>Email : ContactJobs@asd.com</div>
                                <div>Facebook : ContactJobs</div>
                                <div>Line : ContactJobs</div>
                            </v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </div>
    </v-row>

    <v-toolbar class="m-2 rounded-lg elevation-1">
        <template>
            <v-tabs class="border rounded" color="error" v-model="tabs" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                <v-tab class="font-weight-black">สินค้าทั้งหมด</v-tab>
                <v-tab class="font-weight-black">ควาย</v-tab>
                <v-tab class="font-weight-black">ผลิตภัณฑ์จากฟาร์ม</v-tab>
                <v-tab class="font-weight-black">ปุ๋ย</v-tab>
                <v-tab class="font-weight-black">อุปกรณ์การเกษตกร</v-tab>
                <v-tab class="font-weight-black">อื่นๆ</v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
        <v-tab-item class="bg-gray-100">
            <ProductAll />
        </v-tab-item>
        <v-tab-item class="bg-gray-100">
            <ProductBuffalo />
        </v-tab-item>
        <v-tab-item class="bg-gray-100">
            <ProductFarm />
        </v-tab-item>
        <v-tab-item class="bg-gray-100">
            <ProductFertilizer />
        </v-tab-item>
        <v-tab-item class="bg-gray-100">
            <ProductEquipment />
        </v-tab-item>
        <v-tab-item class="bg-gray-100">
            <ProductOther />
        </v-tab-item>
    </v-tabs-items>

</div>
</template>

<script>
import test from "@/assets/ink_landscape_ching_ming_festival_4104466.jpg"
import test1 from "@/assets/pexels-photo-2039606.jpeg"
import ProductAll from "./Tabs/ProductAll.vue"
import ProductBuffalo from "./Tabs/ProductBuffalo.vue"
import ProductEquipment from "./Tabs/ProductEquipment.vue"
import ProductFertilizer from "./Tabs/ProductFertilizer.vue"
import ProductFarm from './Tabs/ProductFarm.vue'
import ProductOther from './Tabs/ProductOther.vue'
export default {
    components: {
        ProductAll,
        ProductBuffalo,
        ProductEquipment,
        ProductFertilizer,
        ProductFarm,
        ProductOther
    },
    data() {
        return {
            test,
            test1,
            tabs: null,
            dialog: false,
        }
    },
}
</script>

<style>

</style>
