<template>
<div class="px-4 py-5 flex-auto">
    <div class="flex-auto lg:px-10 py-10 pt-0">
        <form>
            <div class="text-center flex justify-between">
                <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                    รายละเอียด
                </h6>
                <div class="text-md">
                    <button class="mt-1 text-xs rounded p-3 bg-red-500 hover:bg-red-800  focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                        <div class="text-white"><i class="fas fa-eraser"></i> ลบประกาศขาย</div>
                    </button>
                </div> 
            </div>
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ชื่อสินค้า
                        </label>
                        <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                <i class="fas fa-tags text-lg text-gray-500"></i>
                            </span>
                            <input type="text" value="" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-6/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            หมวดหมู่
                        </label>
                        <div class="relative mb-3 rounded bg-gray-100 border border-l-2 border-green-500">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                <i class="fas fa-tag text-lg text-gray-500"></i>
                            </span>
                            <select class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" id="grid-state">
                                <option>ควาย</option>
                                <option>ผลิตภัณฑ์จากฟาร์ม</option>
                                <option>ปุ๋ย</option>
                                <option>อุปกรณ์การเกษตกร</option>
                                <option>อื่นๆ</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="w-full lg:w-12/12 px-1">
                    <div class="relative w-full">
                        <v-checkbox label="ช่วงราคา" v-model="price" value="value"></v-checkbox>
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            ราคา
                        </label>
                        <div v-if="!price" class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                <i class="fas fa-money-bill text-lg text-gray-500"></i>
                            </span>
                            <input type="number" value="" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                        </div>
                        <!-- <v-text-field  v-if="!price" label="" placeholder="ราคา" type="number" outlined prepend-inner-icon="mdi-numeric" ></v-text-field> -->
                        
                        <div v-else class="flex md:flex-row flex-col">
                            <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                                กำหนดช่วงราคา
                            </label>
                            <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500 w-full">
                                <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                    <i class="fas fa-money-bill  text-lg text-gray-500"></i>
                                </span>
                                <input type="number" value="" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                            </div>
                            <span class="p-3">ถึง</span>
                            <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500 w-full">
                                <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                    <i class="fas fa-money-bill  text-lg text-gray-500"></i>
                                </span>
                                <input type="number" value="" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-12/12 px-1">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            รูปแบบการประกาศขาย
                        </label>
                        <div class="relative mb-3 rounded bg-gray-100 border border-l-2 border-green-500">
                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                <i class="fas fa-bullhorn text-lg text-gray-500"></i>
                            </span>
                            <select :items="type" v-model="postType" class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" id="grid-state">
                                <option>ถาวร</option>
                                <option>ชั่วคราว</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <div class="w-full lg:w-12/12 ">
                            <div class="relative w-full">
                                <div v-if="postType != 'ถาวร'" class="">
                                    <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        กำหนดระยะเวลา
                                    </label>
                                    <div class="flex md:flex-row flex-col">

                                        <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500 w-full">
                                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                                <i class="fas fa-calendar-day  text-lg text-gray-500"></i>
                                            </span>
                                            <input type="date" value=" " class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                                        </div>

                                        <span class="p-3">ถึง</span>

                                        <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500 w-full">
                                            <span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1 mt-2">
                                                <i class="fas fa-calendar-day  text-lg text-gray-500"></i>
                                            </span>
                                            <input type="date" value=" " class="p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-12/12 px-1 lg:mt-11 ">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            คำอธิบายสินค้า
                        </label>
                        <div class="mb-3 rounded bg-gray-100 border border-l-2 border-green-500">
                            <textarea type="text" value="" class="p-3 w-full pl-4 " />
                            </div>
                    </div> 
                </div>

                <div class="w-full lg:w-4/12 px-1 mt-4 " v-for="i in 4">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2 ">
                            อัพโหลดภาพถ่ายสินค้า
                        </label>
                        <div class="relative flex w-full flex-wrap items-stretch mb-3">
                            <div class="flex justify-center mt-4">
                                <input type="file">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-4/12 px-1 mt-4 ">
                    <div class="relative w-full mb-3">
                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2">
                            อัพโหลดวีดีโอสินค้า
                        </label>
                        <div class="relative flex w-full flex-wrap items-stretch mb-3">
                            <div class="flex justify-center mt-4">
                                <input type="file">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex justify-center mt-6">
                <button class="rounded p-3 bg-green-500 hover:bg-green-800  focus:outline-none focus:ring-4 focus:ring-green-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">
                    <div class="text-white"><i class="fas fa-save text-lg"></i> บันทึกข้อมูล</div>
                </button>
            </div>

        </form>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            price: false,
            postType: 'ถาวร',
            price: false,
            type: ['ถาวร', 'ชั่วคราว'],
        }
    }

}
</script>

<style>

</style>
