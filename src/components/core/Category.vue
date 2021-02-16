<template>
<div>
    <v-card-title primary-title class="">
        หมวดหมู่
    </v-card-title>
    <v-card-text>
        <v-container>
            <center>
                <v-row>
                    <div class="w-1/3 md:w-1/6">
                        <div class="p-1 m-1 cursor-pointer bg-yellow-400 hover:bg-yellow-600 rounded-lg h-32">
                            <div class="mt-2">
                                <img src="@/assets/icon/buffalo.png" alt="" class="w-14 h-14">
                                <p class="text-white text-base font-bold mt-2">ควาย</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 md:w-1/6">
                        <div class="pa-1 m-1 cursor-pointer bg-gray-400 hover:bg-gray-600 rounded-lg h-32" outlined tile>
                            <div class="mt-2">
                                <img src="@/assets/icon/farm.png" alt="" class="w-14 h-14">
                                <p class="text-white text-base font-bold mt-2">สินค้าจากฟาร์ม</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 md:w-1/6">
                        <div class="pa-1 m-1 cursor-pointer bg-green-400 hover:bg-green-600 rounded-lg h-32" outlined tile>
                            <div class="mt-2">
                                <img src="@/assets/icon/harvest.png" alt="" class="w-14 h-14">
                                <p class="text-white text-base font-bold mt-2">สินค้าจากชุมชน</p>
                            </div>
                        </div>
                    </div>
                </v-row>
            </center>
        </v-container>
    </v-card-text>
</div>
</template>
