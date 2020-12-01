<template>
<!-- bg-gradient-to-r from-red-400 to-red-600 -->
<header class="bg-white shadow-lg sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
    <div >
        <button @click="$router.go(-1)" class="p-2 rounded-full border hover:bg-red-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:mt-0 sm:ml-2 mt-1 px-2 py-1">
            <i class="fas fa-arrow-circle-left text-3xl"></i>
        </button>
    </div>
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
        <div>
            <img class="h-14" :src="buffalo" alt="logo">
        </div>

        <div class="sm:hidden">
            <button @click="isOpen = !isOpen" type="button" class="block text-gray-500 hover:text-black focus:text-black focus:outline-none">
                <svg class="h-6 w-6 fill-current " viewBox="0 0 24 24">
                    <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                    <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
            </button>
        </div>
    </div>
    <nav :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:p-0">
        <a href="/#/user/home/" class="p-2 rounded border hover:bg-red-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:mt-0 sm:ml-2 mt-1 block px-2 py-1">หน้าแรก</a>
        <a href="/#/user/post/" class="p-2 rounded border hover:bg-red-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:mt-0 sm:ml-2 mt-1 block px-2 py-1">ประกาศของฉัน</a>
        <a href="/#/user/report/" class="p-2 rounded border hover:bg-red-500 hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:mt-0 sm:ml-2 mt-1 block px-2 py-1">รายงานสถิติ</a>
        <!-- <a href="/#/user/report/" class="mt-1 block px-2 py-1  font-semibold rounded hover:bg-red-700 sm:mt-0 sm:ml-2 hover:text-white">รายงานสถิติ</a> -->
        <div @click="profileMenu=!profileMenu" class="relative text-sm rounded text-white sm:mt-0 sm:ml-2">
            <button class="w-full flex items-center rounded bg-red-500 border hover:bg-red-800 hover:text-white hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 sm:mt-0 sm:ml-2 mt-1 block px-2">
                <img class="w-8 h-8 rounded-full mr-4" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg" alt="Avatar of User"> <span class=" md:inline-block ">สมรศรีจันทร์</span>
                <svg class="pl-2 h-2 text-right" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                    <g>
                        <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                    </g>
                </svg>
            </button>
            <div v-if="profileMenu" class="bg-white  rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 w-64 md:w-auto">
                <ul class="list-reset">
                    <li @click="$router.push('/user/profileuser')">
                        <p class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">โปรไฟล์</p>
                    </li>
                    <li>
                        <hr class="border-t mx-2 border-gray-400">
                    </li>
                    <li><a href="/#/" class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">ออกจากระบบ</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import buffalo from "@/assets/buffalo.png";
export default {
    data() {
        return {
            buffalo,
            isOpen: false,
            profileMenu: false,

        }
    },
}
</script>
