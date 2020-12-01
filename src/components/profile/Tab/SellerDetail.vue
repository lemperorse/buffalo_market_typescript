<template>
<div>
    <div class="rounded-t bg-white mb-0 px-1 py-6">
        <div class="text-center flex flex-wrap justify-between">
            <h6 class="text-gray-800 text-xl font-bold">ข้อมูลผู้ขาย</h6>
            <button class="rounded w-full md:w-1/6 p-2 bg-yellow-500 hover:bg-yellow-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                <div class="text-white"><i class="fas fa-pencil-alt"></i> แก้ไข</div>
            </button>
            <!-- <button class="bg-red-500 f-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                <i class="fas fa-pencil-alt text-lg"></i> ยกเลิกการแก้ไข
            </button> -->
        </div>
    </div>
    <div class="flex-auto px-1 lg:px-10 py-10 pt-0">
        <form>
            <div class="flex flex-wrap">
                <div class="w-full  lg:w-6/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ชื่อทางการค้า
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="far fa-address-card text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุชื่อทางการค้าของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>

                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-1">
                    <div class="relative w-full mb-6">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ที่ตั้งทางการค้า
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-map-marked-alt text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุที่ตั้งทางการค้าของคุณ"  class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-12/12  mb-6">
                    <div class="flex flex-wrap">
                        <div class="w-full lg:w-12/12 px-1">
                            <div class="bg-white border-l-2 border-green-500 rounded shadow-xl p-2 mt-6">
                                <div class="flex flex-col md:flex-row items-center">
                                    <GmapMap class="sizemap" :center="center" :zoom="7" map-type-id="roadmap">
                                        <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center = m.position" />
                                    </GmapMap>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            พิกัดฟาร์มตามระบบ GPS (ละติจูด)
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-thumbtack text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุพิกัดละติจูด" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            พิกัดฟาร์มตามระบบ GPS (ลองจิจูด)
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-thumbtack text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุพิกัดลองจิจูด" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ชื่อ
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-user text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุชื่อของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            นามสกุล
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-user text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุนามสกุลของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-12/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="md:w-2/3 block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox">
                            <span class="text-sm">
                                ใช้ข้อมูลเดียวกับข้อมูลส่วนตัว
                            </span>
                        </label>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ที่อยู่ตามทะเบียนบ้าน
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-user text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุที่อยู่ของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12 lg:pt-8 px-1">
                    <div class="relative w-full mb-3">
                        <label class="md:w-2/3 block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox">
                            <span class="text-sm">
                                ใช้ที่อยู่เดียวกับข้อมูลส่วนตัว
                            </span>
                        </label>
                    </div>
                </div>

                <div class="w-full  lg:w-12/12 px-1">
                    <hr class="mt-6 border-b-1 border-gray-400" />
                    <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                        ช่องทางการติดต่ออื่นๆ
                    </h6>
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Email
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="far fa-envelope text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุ Email ของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>

                    </div>
                </div>

                <div class="w-full  lg:w-12/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Facebook
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fab fa-facebook text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุ Facebook ของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full  lg:w-12/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Line
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fab fa-line text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุ Line ID ของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full  lg:w-12/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            เบอร์โทรศัพท์
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-phone text-lg text-gray-500"></i>
                            </span>
                            <input type="number" placeholder="โปรดระบุหมายเลขโทรศัพท์ของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex justify-center mt-6">
                <button class="rounded p-3 bg-green-500 hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                    <div class="text-white"><i class="fas fa-save text-lg"></i> บันทึกข้อมูล</div>
                </button>
            </div>

        </form>

    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from 'vue-property-decorator';

@Component({
    components: {},
    computed: {},
    data() {
        return {
            center: {
                lat: 19.1664466,
                lng: 99.9019888,
            },
            markers: [{
                    position: {
                        lat: 19.1664466,
                        lng: 99.9019888,
                    },
                },
                {
                    position: {
                        lat: 20.0,
                        lng: 99.9019888,
                    },
                },
                {
                    position: {
                        lat: 19.3,
                        lng: 100.9019888,
                    },
                },
                {
                    position: {
                        lat: 20.3,
                        lng: 100.9019888,
                    },
                },
            ],

        }
    }
})

export default class Profile extends Vue {

}
</script>

<style>
.f-white {
    color: white !important;
}

.sizemap {
    width: 1000px;
    height: 300px;
}
</style>
