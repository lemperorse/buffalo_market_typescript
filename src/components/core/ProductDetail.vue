<template>
<div>
    <div class="w-full md:w-1/1 xl:w-1/1 p-3 md:p-3">
        <div class="row bg-white rounded border hover:shadow-lg overflow-hidden">
            <div class="col-md-5 col-sm-5 col-xs-12">

                <v-carousel class="rounded" >
                    <v-carousel-item src="https://images.pexels.com/photos/1066226/pexels-photo-1066226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                    </v-carousel-item>
                    <v-carousel-item src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                    </v-carousel-item>
                    <v-carousel-item src="https://images.pexels.com/photos/46188/bison-buffalo-american-animal-46188.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260">
                    </v-carousel-item>
                    <v-carousel-item src="https://images.pexels.com/photos/16009/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                    </v-carousel-item>
                    <v-carousel-item>
                        <video class="w-full h-full" controls autoplay>
                            <source :src="testvideo" type="video/mp4">
                            <source src="mov_bbb.ogg" type="video/ogg"> 
                        </video>
                    </v-carousel-item>
                </v-carousel>

            </div>
            <div class="col-md-7 col-sm-7 col-xs-12">
                
                <div class="pl-6">
                    <p class="text-2xl mb-0 mt-2 font-bold">ควายเผือกเอเชีย</p>
                    <v-card-actions class="pa-0">
                        <p class="headline font-weight-light pt-3">
                            ฿12,000
                            <del style="" class="subtitle-1 font-weight-thin">฿20,000</del>
                        </p>
                    </v-card-actions>
                    <v-divider></v-divider>
                    <p class="text-xl font-bold mt-4">รายละเอียดควาย</p>
                    <p class="text-xl">น้ำหนัก : 530 กิโลกรัม</p>
                    <p class="text-xl">ความสูง : 120 เซนติเมตร</p>
                    <p class="text-xl">อายุ : 5 ปี</p>
                </div>
 
            </div>
        </div>
    </div>

    <div class="bg-white rounded p-2 border hover:shadow-lg overflow-hidden">
        <div class="pa-2">
            <v-row wrap>
                <v-col cols="12" sm="6" md="8">
                    <v-row wrap>
                        <div class="pa-2 ml-5">
                            <v-avatar @click="$router.push('/user/sellerdetail')" size="55">
                                <img src="https://cache.gmo2.sistacafe.com/images/uploads/summary/image/65745/9738ebc7fc580672cfc0053c43d9ad2e.jpg" />
                            </v-avatar>
                        </div>

                        <div class="ml-2">
                            <h3>แอน แอนนี่</h3>
                            <h3>จังหวัด : พะเยา</h3>
                            <div class="flex ">
                                <button @click="$router.push(`/user/sellerdetail`)" class="text-sm rounded p-2 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                    <div class="text-white"> แสดงรายละเอียด</div>
                                </button>
                            </div>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="6" md="4">
                    <div class="ml-5">
                        <div class="text--primary">เบอร์ติดต่อ : 0812345678 <br /></div>
                        <div class="flex ">
                            <!-- <button @click="dialog = true" class="w-full md:w-1/2 p-1 rounded bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" type="submit">
                                <div class="text-white">นำทาง</div>
                            </button> -->
                            <button @click="dialog = true" class="w-full md:w-1/2 text-sm rounded p-2 bg-blue-500 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                                <div class="text-white"> นำทาง</div>
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
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>

    <div class="w-full md:w-1/1 xl:w-1/1 p-3 md:p-3 mb-2">
        <div class="row bg-white rounded p-2 border hover:shadow-lg overflow-hidden">
            <div class="col-sm-12 col-xs-12 col-md-12">
                <v-tabs class="rounded" color="error" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
                    <v-tab>รายละเอียด</v-tab>
                    <v-tab>ช่องทางการติดต่ออื่นๆ</v-tab>
                    <v-tab-item>
                        <p class="pt-4 font-weight-thin text-lg">
                            ชื่อสินค้า : ควายเผือกเอเชีย
                        </p>
                        <p class="font-weight-thin text-lg">สี : ดำ</p>
                        <p class="font-weight-thin text-lg">น้ำหนัก : 530 กิโลกรัม</p>
                        <p class="font-weight-thin text-lg">ความสูง : 120 เซนติเมตร</p>
                        <p class="font-weight-thin text-lg">อายุ : 5 ปี</p>
                        <v-divider></v-divider>
                        <p class="pt-4 font-weight-thin text-lg">
                            ควาย หรือภาษาทางการว่า กระบือ จัดอยู่ในไฟลัมสัตว์มีแกนสันหลัง
                            ชั้นสัตว์เลี้ยงลูกด้วยนม
                            เป็นสัตว์เลี้ยงที่ใกล้ชิดกับงานเกษตรกรรมของประเทศแถบเอเชียมากที่สุด[ต้องการอ้างอิง]
                            เพราะชาวนานิยมเลี้ยงควายเป็นแรงงานเพื่อไว้ไถนา
                            บ้างก็ใช้ควายเป็นพาหนะเข้าไปทำไร่ทำนา
                            บ้างก็ฆ่าควายกินเนื้อเป็นอาหาร ควายจึงมีประโยชน์หลายประการ
                            ปัจจุบันมีการใช้งานควายน้อยลง
                        </p>
                    </v-tab-item>
                    <v-tab-item>
                        <p class="pt-4 font-weight-thin text-lg">
                            Email : 123123@123.com
                        </p>
                        <p class="font-weight-thin text-lg">Facebook : Wert</p>
                        <p class="font-weight-thin text-lg">Line : @aaa333</p>
                        <p class="font-weight-thin text-lg">เบอร์ติดต่อ : 0812345678</p>
                        <p class="font-weight-thin text-lg">
                            ที่อยู่ : 123/123 บ้านโซ้
                        </p>
                    </v-tab-item>
                </v-tabs>
            </div>
        </div>
    </div>

    <v-divider class="mt-8"></v-divider>
    <p class="font-weight-light pt-3 text-center te xt-2xl">สินค้าอื่นๆ</p>
    <p class="font-weight-light text-center text-2xl text-purple-600">
        ของผู้ขายคนนี้
    </p>
    <v-card-title primary-title>
        <v-spacer></v-spacer>
        <button class="p-2 m-1 text-sm rounded p-3 bg-blue-500 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
            <i class="fas fa-arrow-left text-white"></i>
        </button>
        <button class="p-2 m-1 text-sm rounded p-3 bg-blue-500 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
            <i class="fas fa-arrow-right text-white"></i>
        </button>
    </v-card-title>
    <v-card-text class="pa-0 pt-4" tile outlined>
        <div class="row ">
            <div class="col-md-2 col-sm-4 col-6 cursor-pointer" v-for="i in 6" @click="$router.push('/user/productdetail/')">
                <v-hover v-slot:default="{ hover }">
                    <div class="mx-auto card rounded-lg bg-white hover:shadow-lg overflow-hidden border">
                        <v-img class="white--text align-end" height="150px" src="https://images.pexels.com/photos/1054650/pexels-photo-1054650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                            <v-expand-transition>
                                <div v-if="hover" class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 black--text" style="height: 100%">
                                    <v-btn v-if="hover" href="/#/user/productdetail/" class="" outlined>ดูรายละเอียด</v-btn>
                                </div>
                            </v-expand-transition>
                        </v-img>
                        <div class="p-6 ">
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
    </v-card-text>
</div>
</template>

<script>
import testvideo from "@/assets/video/mov_bbb.mp4"
export default {
    data() {
        return {
            dialog: false,
            testvideo,
            breadcrums: [{
                    text: "หน้าแรก",
                    disabled: false,
                    href: "breadcrumbs_home",
                },
                {
                    text: "ประกาศขาย",
                    disabled: true,
                    href: "breadcrumbs_announce",
                },
                {
                    text: "ควาย",
                    disabled: true,
                    href: "breadcrumbs_buffalo",
                },
                {
                    text: "ควายเอเชีย",
                    disabled: true,
                    href: "breadcrumbs_buffaloasia",
                },
                {
                    text: "ควายเผือกเอเชีย",
                    disabled: true,
                    href: "breadcrumbs_buffaloasia",
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
