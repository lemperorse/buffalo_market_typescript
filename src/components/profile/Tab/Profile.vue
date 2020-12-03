<template>
<div>
    <div class="rounded-t bg-white mb-0 px-1 py-6">
        <div class="text-center flex flex-wrap justify-between">
            <h6 class="text-gray-800 text-xl font-bold">ข้อมูลทั่วไป(ผู้ใช้งาน)</h6>
            <button class="rounded w-full md:w-1/6 p-2 bg-yellow-500 hover:bg-yellow-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                <div class="text-white"><i class="fas fa-pencil-alt"></i> แก้ไข</div>
            </button> 
        </div>
    </div>
    <div class="flex-auto px-1 lg:px-10 py-10 pt-0">
        <form>
            <!-- <h6 class="text-gray-500 text-sm mb-6 font-bold uppercase">
                ข้อมูลส่วนตัว
            </h6> -->
            <div class="flex flex-wrap">
                <div class="w-full  lg:w-12/12 px-1 ">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2 ">
                            ชื่อผู้ใช้งาน
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-user text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุชื่อผู้ใช้งานของคุณ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ชื่อ
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                                <i class="far fa-address-card text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุชื่อ" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            นามสกุล
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1 ">
                                <i class="far fa-address-card text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุนามสกุล" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ที่อยู่ตามสำเนาทะเบียนบ้าน
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-home text-lg text-gray-500"></i>
                            </span>
                            <input type="text" placeholder="โปรดระบุที่อยู่" class="p-3 w-full pl-10 hover:shadow-lg" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12  px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            เบอร์โทรศัพท์
                        </label>
                        <div class="mb-3 rounded bg-gray-200 border-l-2 border-green-500">
                            <span class="mt-1.5 h-full leading-snug font-normal text-center absolute rounded w-8 pl-2 py-1">
                                <i class="fas fa-mobile-alt text-lg text-gray-500"></i>
                            </span>
                            <input type="number" placeholder="โปรดระบุหมายเลขโทรศัพท์" class="p-3 w-full pl-10 hover:shadow-lg" />
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
    computed: {}
})

export default class Profile extends Vue {

}
</script>

<style>
.f-white {
    color: white !important;
}
</style>
