<template>
<div class="p-2">
    <v-container grid-list-xs>
        <div class="px-1 md:px-10 mx-auto w-full">
            <div>
                <v-row class="pb-6 ">
                    <div>
                        <!-- <pre>{{user}}</pre> -->
                        <div class="pa-2 wrap elevation-0   ">
                            <span class="text-xl">{{_lang('รายการของฉัน','My list','我的列表')}}</span>
                        </div>
                    </div>

                </v-row>
            </div>
        </div>

        <v-row>
            <v-col cols="12" md="4">
                <v-card class="pa-2 rounded-lg ">
                    <span class="text-xl"> {{_lang('สถานะประกาศ','Announcement Status','公告狀態')}}</span>
                    <v-radio-group>
                        <v-radio label="ทั้งหมด" value="radio-0"></v-radio>
                        <v-radio label="รับซื้อ" value="radio-1"></v-radio>
                        <v-radio label="ได้รับสินค้าแล้ว" value="radio-2"></v-radio>
                        <v-radio label="มีสินค้า" value="radio-3"></v-radio>
                        <v-radio label="สินค้าหมด" value="radio-4"></v-radio>
                        <v-radio label="ขายแล้ว" value="radio-5"></v-radio>
                        <v-radio label="ยกเลิก" value="radio-6"></v-radio>
                    </v-radio-group>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="8">
                <v-card class=" rounded-lg">
                    <div>
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                {{_lang('รูปภาพสินค้า','Product pictures','產品圖片')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ชื่อสินค้า','Product name','產品名稱')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ราคา','Price','價格')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('ประเภทประกาศ','Announcement type','公告類型')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('วันที่ลงประกาศ','Date posted','發布日期')}}
                                            </th>
                                            <th class="text-left">
                                                {{_lang('การจัดการ','Edit','修改')}}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for=" i in 10">
                                            <td class="pa-2">
                                                <v-avatar color="primary" size="56"></v-avatar>
                                            </td>
                                            <td class="pa-2"><span class="">สินค้าทดลอง</span></td>
                                            <td class="pa-2"><span>฿ 5000</span></td>
                                            <td class="pa-2"><span>ประกาศซื้อ</span></td>
                                            <td class="pa-2"><span>12/12/2012</span></td>
                                            <td class="pa-2">
                                                <v-btn rounded depressed color="info">{{_lang('ดู','View','看法')}}</v-btn>
                                                <v-btn rounded depressed color="warning">{{_lang('แก้ไข','Edit','修改')}}</v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </div>
                </v-card>

                <div class="text-center mt-4">
                    <v-pagination v-model="page" :length="4" circle></v-pagination>
                </div>

            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
        }
    },
}
</script>

<style>

</style>
