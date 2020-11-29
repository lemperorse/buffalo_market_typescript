<template>
<div>
    <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
            <h6 class="text-gray-800 text-xl font-bold">ข้อมูลทั่วไป</h6>
            <button class="rounded p-1 bg-purple-600 hover:bg-purple-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50" type="button">
                <div class="text-white"><i class="fas fa-pencil-alt text-lg"></i>แก้ไข</div>
            </button>
            <!-- <button class="bg-red-500 f-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                <i class="fas fa-pencil-alt text-lg"></i> ยกเลิกการแก้ไข
            </button> -->
        </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form> 
            <div class="flex flex-wrap">
                <div class="w-full  lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            รหัสผ่านใหม่
                        </label>
                        <div class="mb-3 rounded bg-gray-200">
                            <span class="z-10 mt-2 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 ">
                                <i class="fas fa-key text-lg text-gray-500"></i>
                            </span>
                            <input type="password" class="p-3 w-full pl-10"/>
                        </div>

                    </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ยืนยันรหัสผ่าน
                        </label>
                        <div class="mb-3 rounded bg-gray-200">
                            <span class="z-10 mt-2 h-full leading-snug font-normal text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 ">
                                <i class="fas fa-key text-lg text-gray-500"></i>
                            </span>
                            <input type="password"  value="" class="p-3 w-full pl-10"/>
                        </div>
                    </div>
                </div> 

            </div>

            <div class="flex justify-center mt-6">
                <button class="rounded p-3 bg-green-600 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50" type="submit">
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
